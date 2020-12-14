import React from 'react'
import { withUrqlClient } from 'next-urql'
import { Flex, Box, Button, Heading } from '@chakra-ui/core'
import { createUrqlClient } from '@/utils/createUrqlClient'
import { Post, usePostsQuery } from '@/generated/graphql'
import { PostComponent } from '@/components/post/Post'
import { PostInput } from '@/components/post/PostInput'
import { PostLoading } from '@/components/post/PostLoading'
import Loader from '@/components/Loader'

type NS = string | null

const Index = () => { 
  const [hasMounted, setHasMounted] = React.useState(false);
  const [variables, setVariables] = React.useState({ limit: 5, cursor: null })
  const [{ data, fetching }] = usePostsQuery({ variables })

  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  const loadMore = () => {
    const len =  data.posts.posts.length - 1
    const cursor: NS = data.posts.posts[len].createdAt
    setVariables({ limit: variables.limit, cursor })
  }
  
  return (
    <Box>
      <PostInput></PostInput>
      
      <Loader></Loader>
      {hasMounted && fetching 
        ?
        (
          [1, 2, 3, 4, 5].map(num => <PostLoading key={num}></PostLoading>)
        )
          :
        (
          <Box>
            {
              data?.posts?.posts?.map((post: Post) => (
                <PostComponent key={post.id} post={post} />
              ))
            }
          </Box>
        )
      }
      
      {/* <Box>
      {(hasMounted && data) ?
          <Flex w="100%" h={200} justify="center" align="center">
            <Heading size="md">Loading...</Heading>

          </Flex> :
          (

          )
        }
      </Box> */}

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


/**
 *  Unless the component that is being wrapped already has a `getInitialProps` method, 
 * next-urql won't add its own SSR logic (which automatically fetches queries during 
 * server-side rendering). 
 *  This can be explicitly enabled by passing the { ssr: true } 
 * option as a second argument to withUrqlClient
 */
export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
