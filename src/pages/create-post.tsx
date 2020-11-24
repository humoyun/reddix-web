import React from 'react'
import { Box, Button } from '@chakra-ui/core'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import { Form, Formik } from 'formik'

import { PostType, useCreatePostMutation } from '../generated/graphql'
import { createUrqlClient } from '../utils/createUrqlClient'
import { InputField } from '../components/InputField'
import { useIsAuth } from '../utils/useIsAuth'
import { BodyWrapper } from '../components/BodyWrapper'

const CreatePost: React.FC<any> = ({ }) => {
  const router = useRouter()
  const [, createPost] = useCreatePostMutation()
  
  useIsAuth()

  return (
    <BodyWrapper>
      Create New post
      <Formik
        initialValues={{ title: '', text: '', type: PostType.Txt }}
        onSubmit={async (values) => {
          const { error } = await createPost({ input: values })

          if (!error) {
            router.push('')
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField type="text" name="title" placeholder="title" label="Title" />
            <Box>
              <InputField
                textarea
                type="text"
                name="text"
                placeholder="text..."
                label="Body"
              />
            </Box>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              colorScheme="teal"
            >
              create post
            </Button>
          </Form>
        )}
      </Formik>
    </BodyWrapper>
  )
}

export default withUrqlClient(createUrqlClient)(CreatePost)