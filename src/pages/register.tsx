import React from "react";
import { Formik, Form } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Box,
  Button,
} from "@chakra-ui/core";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useMutation } from 'urql'
import { useRouter } from 'next/router'
import { useRegisterMutation } from '../generated/graphql'
import { toErrorMap } from "../utils/errorMapper";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlCLient";

interface registerProps {}

const Register: React.FC<registerProps> = ({ }) => {
  const router = useRouter()
  const [, register] = useRegisterMutation();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {     
          console.log("values ", values); 
          const resp = await register(values)
          if (resp.data?.register.errors) {
            setErrors(toErrorMap(resp.data?.register.errors));
          } else if (resp.data?.register.member) { 
            router.push("/")
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField   
              name="username"
              placeholder="username"
              label="Username"
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
              register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Register);