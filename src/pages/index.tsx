import { useState } from 'react'
import { withUrqlClient } from 'next-urql'
import { Flex, Box, Button, Heading } from '@chakra-ui/core'
import { createUrqlClient } from '../utils/createUrqlCLient'
import { usePostsQuery } from '../generated/graphql'
import { Post } from '../components/Post'
import { PostInput } from '../components/PostInput'

type NS = string | null

const Index = () => { 
  const [variables, setVariables] = useState({limit: 5, cursor: null})
  const [{ data, fetching }] = usePostsQuery({ variables })

  console.log('usePostsQuery ', data)
  const loadMore = () => {
    console.log('*** loadMore ***')
    const len =  data.posts.posts.length - 1
    const cursor: NS = data.posts.posts[len].createdAt
    setVariables({ limit: variables.limit, cursor })
  }
  
  return (
    <Box>
      <PostInput></PostInput>
      
      <Box>
      {!data ?
          <Flex w="100%" h={200} justify="center" align="center">
            <Heading size="md">Loading...</Heading>
          </Flex> :
          (<Box>
            {
              data.posts.posts.map((post) => (
                <Post key={post.id} data={post} />
              ))
            }
          </Box>
          )
        }
      </Box>

      <Flex className='load-more-btn'>
        {/* This div className is also the same as Flex className inside loop */}
        <Button
          variant="outline"
          m="auto"
          onClick={() => loadMore()}
          isLoading={fetching}>
          
          Load more
        </Button>
      </Flex>

    </Box>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
