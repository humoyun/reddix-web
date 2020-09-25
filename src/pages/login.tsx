import React from 'react'
import { Formik, Form } from 'formik'
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Box,
  Button,
} from '@chakra-ui/core'
import { BodyWrapper } from "../components/BodyWrapper";
import { InputField } from '../components/InputField'
import { useMutation } from 'urql'
import { useRouter } from 'next/router'
import { useLoginMutation } from '../generated/graphql'
import { toErrorMap } from '../utils/errorMapper'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlCLient'

interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
  const [, login] = useLoginMutation()
  const router = useRouter()
  
  return (
    <BodyWrapper variant="small">
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          console.log("values ", values);
          const resp = await login(values);
          if (resp.data?.login.errors) {
            setErrors(toErrorMap(resp.data?.login.errors));
          } else if (resp.data?.login.member) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="usernameOrEmail"
              placeholder="username or email"
              label="Username Or Email"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              variantColor="teal"
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </BodyWrapper>
  );
}

export default withUrqlClient(createUrqlClient)(Login)
