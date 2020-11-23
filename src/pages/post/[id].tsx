import React from 'react'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../../utils/createUrqlCLient'
import { useRouter } from 'next/router'
import { Flex, Heading, Spinner, Tag, Text } from '@chakra-ui/core'
import { usePostQuery } from '../../generated/graphql'

const PostPage: NextPage = ({ }) => {
  const router = useRouter()

  const [{ data, fetching }] = usePostQuery({ variables: { id: router.query.id} })

  console.log('data ', data)
  return (
    <Flex>
      
      {fetching ? (<Spinner size="lg" />) : (
        <Flex flexDirection="column">
          <Heading isTruncated as="h3" size="md"> {data.post.title} </Heading>
          <Flex>
            <Tag size="md" variant="solid" colorScheme="teal">
              {data.post.type}
            </Tag>
          </Flex>
          <Text fontSize="md">{data.post.text}</Text>
        </Flex>
      ) }
    </Flex>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(PostPage)