import React from 'react'
import { Formik, Form } from 'formik'
import {
  Box,
  Button,
  Flex,
  Center,
  Heading,
  Link,
  Text
} from '@chakra-ui/core'
import ArrowBackIcon from '@/icons/arrow.svg'
import { InputField } from '@/components/common/InputField'
// import { useMutation } from 'urql'
import { useRouter } from 'next/router'
import { useLoginMutation } from '@/generated/graphql'
import { toErrorMap } from '@/utils/errorMapper'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '@/utils/createUrqlClient'

interface loginProps {
  no?: any
}

/**
 * use custom mini formik library:
 * TODO: https://codesandbox.io/s/tiny-formik-using-hooks-qbpdg?file=/src/hooks/useMyFormik.jsx
 */

// I should use this for form box
// background: linear-gradient(to bottom,#fff 0,#f7f9f9 45%); for back-color  
// box-shadow: 0 0.5em 1em -0.125em rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.02);
const Login: React.FC<loginProps> = ({}) => {
  const [, login] = useLoginMutation()
  const router = useRouter()
  
  return (
    <Flex flexDirection="column" width={350} bg="#fff" borderRadius={4} padding={4}>
      <Center mb={4}>
        <img src="/reddix-logo.png" style={{ width: 75, height: 75, cursor: 'pointer' }} />
      </Center>

      <Flex justifyContent="center" alignItems="center" mb={6}>
        <Heading as="h2" size="lg">
          Login
        </Heading>
      </Flex>

      <Flex position="absolute" top={10} right={20} alignItems="center">
        <ArrowBackIcon
          style={{ fill: '#ccc' }}
          width={14}
          height={14} />
        <Link href="/">
          <Text fontSize="sm" color="gray.500" ml={2}>Go back</Text>
        </Link>
      </Flex>

      <Formik
        initialValues={{ usernameOrEmail: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          try {
            const resp = await login(values)  
            console.log('resp ', resp)
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
            <Box mt={5}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            
            <Flex alignItems="center" flexDirection="column" mt={8}>
              <Button
                w="100%"
                type="submit"
                isLoading={isSubmitting}
                colorScheme="teal"
              >
                Login
              </Button>
  
              <Text fontSize="sm" color="gray.500" mt={4}>
                New to Reddix? {' '}
                <Link color="teal.900" href="/auth/register">
                  Register
                </Link>
              </Text>
            </Flex>

          </Form>
        )}
      </Formik>
    </Flex>
  )
}

export default withUrqlClient(createUrqlClient)(Login)
