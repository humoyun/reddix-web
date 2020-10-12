import { withUrqlClient } from 'next-urql'
import { Box, Heading } from '@chakra-ui/core'
import { createUrqlClient } from '../utils/createUrqlCLient'
import { usePostsQuery } from '../generated/graphql'
import { Post } from '../components/Post'
import { PostInput } from '../components/PostInput'

const Index = () => { 
  const [{ data, loading }] = usePostsQuery({
    variables: {
      limit: 50,
    },
  })
  console.log('usePostsQuery ')

  return (
    <Box>
      <Heading as="h3" size="lg">
        3i Insite Blog
      </Heading>

      <PostInput></PostInput>

      {loading ?
        <Box>Loading...</Box> :
        data && data.posts.map((post) => (
          <Post key={post.id} data={post}></Post>
        ))
      } 


      {/* {!data ? ( <div>Loading...</div> ) : (data.posts.map(p =>
        <div key={p.id}>{p.title}</div>
      ))} */}
    </Box>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
