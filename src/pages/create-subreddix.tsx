import React from 'react'
import { Box, Button } from '@chakra-ui/core'
import { withUrqlClient } from 'next-urql'
// import { useRouter } from 'next/router'
import { Form, Formik } from 'formik'

// import { useCreatePostMutation } from '../generated/graphql'
import { createUrqlClient } from '../utils/createUrqlClient'
import { InputField } from '../components/InputField'
import { useIsAuth } from '../utils/useIsAuth'
import { BodyWrapper } from '../components/BodyWrapper'
import { useCreateSubreddixMutation } from '../generated/graphql'


const CreateSubreddix: React.FC<any> = ({ }) => {
  // const router = useRouter()
  const [, createSubreddix] = useCreateSubreddixMutation()
  
  useIsAuth()

  return (
    <BodyWrapper> 
      Create New Subreddix
      <Formik
        initialValues={{ name: '' }}
        onSubmit={async (values) => {
          const { data, error } = await createSubreddix({ name })

          console.log(data,values)
          console.log(error)
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

            {/* RULES Component */}
            
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

export default withUrqlClient(createUrqlClient)(CreateSubreddix)