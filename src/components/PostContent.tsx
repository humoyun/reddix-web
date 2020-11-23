import React, { useState } from 'react'
import { Flex, Box, Heading } from '@chakra-ui/core'
import { Post } from '../generated/graphql'

interface PostProps {
  post: Post;
  children?: React.ReactDOM
}

const PostContent = ({ post }: PostProps) => {

  return (
    <Flex direction="row" align="center" mt={2}>
      <Heading as="h4" size="sm">
        {post.title}
        </Heading>
      <Box fontSize={14}>{post.text?.slice(0, 100)}</Box>
    </Flex>
  )
}

export default PostContent