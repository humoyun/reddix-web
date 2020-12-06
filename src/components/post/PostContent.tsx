import React, { useState } from 'react'
import { Flex, Box, Heading, Link } from '@chakra-ui/core'
import { Post } from '../../generated/graphql'
import NextLink from 'next/link'


interface PostProps {
  post: Post;
  children?: React.ReactDOM
}

const PostContent = ({ post }: PostProps) => {
  const [dummy, setDummy] = useState('dummy')
  setDummy('mummy')
  console.log(dummy)

  return (
    <Flex direction="row" align="center" mt={2}>
      <NextLink href="/r/post/[id]" as={`/post/${post.id}`}>
        <Link>
          <Heading as="h4" size="sm">{post.title}</Heading>
        </Link>
      </NextLink>
      <Box fontSize={14}>{post.text?.slice(0, 100)}</Box>
    </Flex>
  )
}

export default PostContent