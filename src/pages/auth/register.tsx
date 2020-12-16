import React from 'react'
import { Formik, Form } from 'formik'
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Text
} from '@chakra-ui/core'
import { InputField } from '@/components/common/InputField'
import { useRouter } from 'next/router'
import { useRegisterMutation } from '@/generated/graphql'
import { toErrorMap } from '@/utils/errorMapper'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '@/utils/createUrqlClient'
import ArrowBackIcon from '@/icons/arrow.svg'

interface registerProps {
  dummy?: string
}

const Register: React.FC<registerProps> = ({ }) => {
  const router = useRouter()
  const [, register] = useRegisterMutation()

  return (
    <Flex flexDirection="column" width={350} bg="#fff" borderRadius={4} padding={4}> 
      
      <Flex justifyContent="center" alignItems="center" mb={10}>
        <Heading as="h2"  fontWeight="normal">
          Register
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
        initialValues={{ username: '', email: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          console.log('values ', values)
          const resp = await register({ options: values })
          if (resp.data?.register.errors) {
            setErrors(toErrorMap(resp.data?.register.errors))
          } else if (resp.data?.register.user) {
            router.push('/')
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              type="text"
              name="username"
              placeholder="username"
              label="Username"
            />
            <Box mt={4}>
              <InputField type="email" name="email" placeholder="email" label="Email" />
            </Box>
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
                Register
              </Button>
  
              <Text fontSize="md" color="gray.500" mt={4}>
                Already have account? {'  '}
                <Link color="teal.900" href="/auth/login">
                  Login
                </Link>
              </Text>
            </Flex>

          </Form>
        )}
      </Formik>
    </Flex>
  )
}

export default withUrqlClient(createUrqlClient)(Register)