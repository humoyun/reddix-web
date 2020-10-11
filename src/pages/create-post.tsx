import React from 'react'
import { useIsAuth } from '../utils/useIsAuth'
import { useRouter } from 'next/router'
import { useCreatePostMutation } from '../generated/graphql'
import { Form, Formik } from 'formik'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlCLient'
import { InputField } from '../components/InputField'
import { Box, Button } from '@chakra-ui/core'

const CreatePost = ({ }) => {
  const router = useRouter()
  const [, createPost] = useCreatePostMutation()
  
  useIsAuth()

  return (
    <div>
      Create New post
      <Formik
        initialValues={{ title: '', text: '' }}
        onSubmit={async (values) => {
          const { error } = await createPost({ input: values })
          if (!error) {
            router.push('')
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" placeholder="title" label="Title" />
            <Box>
              <InputField
                textarea
                name="text"
                placeholder="text..."
                label="Body"
              />
            </Box>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              variantcolor="teal"
            >
              create post
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default withUrqlClient(createUrqlClient)(CreatePost)