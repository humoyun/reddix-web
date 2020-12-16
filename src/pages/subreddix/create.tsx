import React from 'react'
import { BodyWrapper } from '@/components/common/BodyWrapper'
import { 
  FormControl, 
  FormLabel, 
  RadioGroup, Stack, Radio, 
  Button, 
  FormErrorMessage, 
  Input, Text, 
  Textarea, Flex, Box, Heading } from '@chakra-ui/core'
import { Formik, Form, Field } from 'formik'
import Select from 'react-select';
import { handleInputChange } from 'react-select/src/utils'



export const topicOptions = [
  { value: 'world-news', label: 'World News', color: '#00B8D9', isFixed: true },
  { value: 'politics', label: 'Politics', color: '#5243AA' },
  { value: 'gaming', label: 'Gaming', color: '#FF5630', isFixed: true },
  { value: 'science', label: 'Science', color: '#FF8B00' },
  { value: 'sports', label: 'Sports', color: '#FFC400' },
  { value: 'art', label: 'Art', color: '#FFC400' },
  { value: 'nature', label: 'Nature', color: '#36B37E' },
  { value: 'forest', label: 'Forest', color: '#00875A' },
  { value: 'technology', label: 'Technology', color: '#253858' },
  { value: 'religion', label: 'Religion', color: '#666666' },
  { value: 'telecom', label: 'Telecom', color: '#666666' },
  { value: 'government', label: 'Government', color: '#666666' },
  { value: 'history', label: 'History', color: '#666666' },
];


const SubreddixCreate = () => {

  const [value, setValue] = React.useState("")

  let handleInputChange = (e) => {
    let inputValue = e.target.value
    setValue(inputValue)
  }

  function validateName(value) {
    let error
    if (!value) {
      error = "Name is required"
    } else if (value !== "Naruto") {
      error = "Jeez! You're not a fan 😱"
    }
    return error
  }

  return (
    <BodyWrapper>
      <Flex marginBottom={5}>
        <Heading as="h2" size="md">Create a community</Heading>
      </Flex>
      <Formik
        initialValues={{ name: "", description: "", type: "public" }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            actions.setSubmitting(false)
          }, 1000)
        }}>
          
        {({ isSubmitting }) => (
          <Form>
            <Box marginBottom={5}>
              <Field name="name" validate={validateName}>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.name && form.touched.name}>
                    <FormLabel htmlFor="name">
                      <Flex flexDirection="column"> 
                        <Text>Name</Text>
                        <Text fontSize="xs" color="#9e9fa0">Community names including capitalization cannot be changed.</Text>
                      </Flex>
                    </FormLabel>
                    <Input {...field} variant="outline" id="name" placeholder="name" bg="#fff" />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Box>  

            <Box marginBottom={5}>
              <Field name="description">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.name && form.touched.name}>
                    <FormLabel htmlFor="description">
                      <Flex flexDirection="column"> 
                        <Text>Description</Text>
                        <Text fontSize="xs" color="#9e9fa0">This is how new members come to understand your community.</Text>
                      </Flex>
                    </FormLabel>
                    <Textarea
                      {...field}
                      value={value}
                      onChange={handleInputChange}
                      placeholder="Description of this subreddix"
                      size="sm"
                      bg="#fff"
                    />
                    <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Box>
            
            <Box marginBottom={10}>
              <FormLabel htmlFor="topics">
                <Flex flexDirection="column"> 
                  <Text>Topics</Text>
                  <Text fontSize="xs" color="#9e9fa0">This will help relevant users find your community.</Text>
                </Flex>
              </FormLabel>
              <Select
                isMulti
                name="colors"
                options={topicOptions}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </Box>

            <Box marginBottom={5}>
              <Field name="type" >
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.name && form.touched.name}>
                    <RadioGroup defaultValue="public">
                      <Stack spacing="24px">
                        <Radio value="public" colorScheme="green">Public 
                          <span style={{ color: '#9e9fa0', fontSize: '0.8em', marginLeft: 10 }}>Anyone can view, post, and comment to this community</span>
                        </Radio>
                        <Radio value="restricted" colorScheme="yellow">Restricted
                          <span style={{ color: '#9e9fa0', fontSize: '0.8em', marginLeft: 10 }}>Anyone can view this community, but only approved users can post</span>
                        </Radio>
                        <Radio value="private" colorScheme="red">Private
                          <span style={{ color: '#9e9fa0', fontSize: '0.8em', marginLeft: 10 }}>Only approved users can view and submit to this community</span>
                        </Radio>
                      </Stack>
                    </RadioGroup>
                    <FormErrorMessage>{form.errors.type}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Box>

            {/* Anyone can view, post, and comment to this community */}
            <Flex justifyContent='flex-end'>
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>

    </BodyWrapper>
  )
}

export default SubreddixCreate