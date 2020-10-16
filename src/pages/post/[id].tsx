import React from 'react'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../../utils/createUrqlCLient'
import { useRouter } from 'next/router'
import { Flex, Heading } from '@chakra-ui/core'

const PostPage: NextPage = ({ }) => {
  const router = useRouter()
  return (
    <Flex>
      <Heading size='2'> welcome to this post</Heading>
      {router.pathname}
    </Flex>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(PostPage)