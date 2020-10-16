import { withUrqlClient } from 'next-urql'
import { Flex, Box, Button, Heading } from '@chakra-ui/core'
import { createUrqlClient } from '../utils/createUrqlCLient'
import { usePostsQuery } from '../generated/graphql'
import { Post } from '../components/Post'
import { PostInput } from '../components/PostInput'

const Index = () => { 
  const [{ data, loading }] = usePostsQuery({
    variables: {
      limit: 10,
    },
  })
  console.log('usePostsQuery ')

  return (
    <Box>
      <Heading as="h3" size="lg">
        3i Insite Blog
      </Heading>

      <PostInput></PostInput>
      
      <Box>
      {!data ?
        <Box>Loading...</Box> :
        (
          data.posts.map((post) => (
            <Post key={post.id} data={post} />
          ))
        )
        }
      </Box>

      <Flex className='load-more-btn'>
        {/* This div className is also the same as Flex className inside loop */}
        <Button
          variant="outline"
          m="auto"
          isLoading={loading}>
          Load more
        </Button>
      </Flex>

    </Box>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
