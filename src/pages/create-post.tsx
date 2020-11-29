import React from 'react'
import { Box, Flex, Stack, Button, Text, Badge, Menu, MenuButton, MenuItem, MenuList, Image } from '@chakra-ui/core'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import Select from 'react-select'
import { Form, Formik } from 'formik'

import { PostType, useCreatePostMutation } from '../generated/graphql'
import { createUrqlClient } from '../utils/createUrqlClient'
import { InputField } from '../components/InputField'
import { useIsAuth } from '../utils/useIsAuth'
import PostTabs from '../components/create-post/PostTabs'


export const subreddixOptions = [
  { value: 'id-of-subreddix-1', img: '#', label: 'r/aww', members: 23 },
  {
    value: 'id-of-subreddix-2',
    label: 'r/Nature',
    img: '#',
    members: 234,
    isDisabled: true
  },
  {
    value: 'id-of-subreddix-3',
    label: 'r/creative-minds',
    img: '#',
    members: 69
  },
  { value: 'id-of-subreddix-4', img: '#', label: 'r/salamandor', members: 3 },
  {
    value: 'id-of-subreddix-5',
    img: '#',
    label: 'r/GetMotivated',
    members: 529
  }
]

export const meOption = [
  {
    value: 'id-of-own-channel',
    img: '#',
    label: 'r/GetMotivated',
    members: 529
  }
]

export const groupedOptions = [
  {
    label: 'My Profile',
    options: meOption
  },
  {
    label: 'My Communities',
    options: subreddixOptions
  }
]


const optionStyles = {
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  padding: '0 15px'
}

const Option = ({ innerRef, innerProps, data }) => {

  return (
    <div ref={innerRef} {...innerProps} style={optionStyles}>
      <div style={{ marginRight: 5 }}>
        <div
          style={{
            width: 30,
            height: 30,
            backgroundColor: '#eee',
            borderRadius: '50%'
          }}
        ></div>
      </div>
      <div>
        <div>{data.label}</div>
        <div style={{ color: '#ccc', fontSize: '0.9em' }}>{data.members} members</div>
      </div>
    </div>
  )
}


const CreatePost: React.FC<any> = ({ }) => {
  const router = useRouter()
  const [, createPost] = useCreatePostMutation()
  
  useIsAuth()

  const onChange = (item: any) => {
    console.log('onChange ', item)
  }
  

  return (
    <Box>
      
      <Flex justifyContent="space-between" alignItems="center">
        <Flex>
          <Text fontSize="xl">Create post</Text>
        </Flex>
        <Flex alignItems="center">
          <Text
            fontSize="sm" 
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing="wide" 
            color="teal.400">
              DRAFTS
            </Text>
            <Badge variantcolor="red">10</Badge>
        </Flex>
      </Flex>

      <div style={{ width: '100%', border: '1px solid #eee', margin: '10px 0;' }}></div>

      <Box my={2} width={[
        '100%', // base
        '100%', // 480px upwards
        '50%', // 768px upwards
        '50%' // 992px upwards
      ]}>
        <Select
          onChange={onChange}
          defaultValue={subreddixOptions[1]}
          options={groupedOptions}
          isSearchable
          isClearable
          components={{ Option }}
          />
      </Box>

      <Flex className="create-post-tab" width="100%" height={400} bgColor="#fff" flexDirection="column">
        <PostTabs></PostTabs>

        <Flex bgColor="#eee" flex="6"></Flex>
        
        <Flex bgColor="#ccc" height={70}></Flex>
      </Flex>

      {/* <Formik
        initialValues={{ title: '', text: '', type: PostType.Txt }}
        onSubmit={async (values) => {
          const { error } = await createPost({ input: values })

          if (!error) {
            router.push('/')
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form style={{ marginTop: 5 }}>
            <Box>
              <InputField type="text" name="title" placeholder="Title" />
            </Box>
            
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
      </Formik> */}
    </Box>
  )
}

export default withUrqlClient(createUrqlClient)(CreatePost)