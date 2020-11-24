import React from 'react'
import { Formik, Form } from 'formik'
import {
  Box,
  Button,
  Flex,
  Link,
  Text
} from '@chakra-ui/core'
import { BodyWrapper } from '@/components/BodyWrapper'
import { InputField } from '@/components/InputField'
// import { useMutation } from 'urql'
import { useRouter } from 'next/router'
import { useLoginMutation } from '@/generated/graphql'
import { toErrorMap } from '@/utils/errorMapper'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '@/utils/createUrqlClient'

interface loginProps {
  no?: any
}

// I should use this for form box
// background: linear-gradient(to bottom,#fff 0,#f7f9f9 45%); for back-color  
// box-shadow: 0 0.5em 1em -0.125em rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.02);
const Login: React.FC<loginProps> = ({}) => {
  const [, login] = useLoginMutation()
  const router = useRouter()
  
  return (
    <BodyWrapper variant="small">
      <Formik
        initialValues={{ usernameOrEmail: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          try {
            const resp = await login(values)  

            if (resp.data?.login.errors) {
              setErrors(toErrorMap(resp.data?.login.errors))
            } else if (resp.data?.login.user) {
              // 
              if (typeof router.query.next === 'string') {
                router.push(router.query.next)
              } else {
                router.push('/')
              }
            }

          } catch (err) {
            console.error('login  failed : ', err)
          }

        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="usernameOrEmail"
              placeholder="username or email"
              label="Username Or Email"
              type="text"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            
            <Flex alignItems="center" flexDirection="column" my={4}>
              <Button
                w="100%"
                type="submit"
                isLoading={isSubmitting}
                colorScheme="teal"
              >
                Login
              </Button>
  
              <Text fontSize="md" color="gray.500" mt={4}>
                New to Reddix? {' '}
                <Link color="teal.900" href="/register">
                  Register
                </Link>
              </Text>
            </Flex>

          </Form>
        )}
      </Formik>
    </BodyWrapper>
  )
}

export default withUrqlClient(createUrqlClient)(Login)
