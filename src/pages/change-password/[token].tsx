import React, { useState } from 'react'
import { NextPage } from 'next'
import { BodyWrapper } from '../../components/BodyWrapper'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../../utils/createUrqlCLient'
import { useRouter } from 'next/router'
import { toErrorMap } from '../../utils/errorMapper'
import { Formik, Form } from 'formik'
import { InputField } from '../../components/InputField'
import { FieldError, useChangePasswordMutation, useCheckTokenQuery } from '../../generated/graphql'
import { Flex, Box, Button, Heading, Link } from '@chakra-ui/core'
import NextLink from 'next/link'
 
const ChangePassword: NextPage = () => { 
  const router = useRouter()
  const [, changePassword] = useChangePasswordMutation()
  const [tokenError, setTokenError] = useState('')
  const [{ data, fetching }] = useCheckTokenQuery({ variables: { token: router.query.token as string }})
  console.log('data useCheckTokenQuery ', data)
  console.log('token fetching ', fetching)

  return (
    <BodyWrapper variant="small">
      <Formik
        initialValues={{ newPassword: '' }}
        onSubmit={async (values, { setErrors }) => {
          const token =
            typeof router.query.token === 'string' ? router.query.token : ''
          const resp = await changePassword({
            newPassword: values.newPassword,
            token,
          })

          if (resp.data?.changePassword.errors) {
            const errorMap = toErrorMap(resp.data?.changePassword.errors) 
            if ('token' in errorMap) {
              setTokenError(errorMap.token)
            }

            setErrors(errorMap)
          } else if (resp.data.changePassword.user) {
            router.push('/')
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="newPassword"
              placeholder="Enter new password..."
              label="New Password"
              type="password" />
            
            {tokenError && (
              <Flex>
                <Box mr={2} style={{ color: 'red' }}>
                  {tokenError}
                </Box>
                <NextLink href="/forgot-password">
                  <Link>click here to get a new one</Link>
                </NextLink>
              </Flex>
            )}

            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              colorScheme="teal"
            >
              change password
            </Button>
          </Form>
        )}
      </Formik>
      
      <Box>
        <Heading size="2">
          Your token has been already expired
        </Heading>
        
      </Box>

    </BodyWrapper>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(ChangePassword)