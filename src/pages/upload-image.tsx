import React from 'react'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlCLient'
import { Box, Heading } from '@chakra-ui/core'
import MediaUpload from '../components/MediaUpload'
import Layout from '../components/Layout'
import { Post } from '../components/Post'
import { CreatePost } from '../components/CreatePost'


const UploadImage = ({ }) => {
  const posts = [
    {
      id: 'post-11',
      title: 'Header icons',
      content:
        'more performant architecture than TSLint and that they will only be focusing on ESLint when providing editor linting integration for TypeScrip',
      vote: 125,
    },
    {
      id: 'post-12',
      title: 'Materail design',
      vote: 12,
      content:
        'The updater function receives the query data as its\' only argument and must return the updated version of said dat',
    },
    {
      id: 'post-13',
      title: 'Node internals gally',
      vote: 45,
      content:
        'Note that we don\'t have to update the query data immutably. Graphcache never returns raw data and will instead always return copies of data',
    },
    {
      id: 'post-14',
      title: 'Black holes',
      vote: 71,
      content:
        'nside the updater we use cache.updateQuery to update a list of todos with the new todo that has bee',
    },
    {
      id: 'post-15',
      title: 'Streaming from Netflex some issues',
      vote: 2,
      content: 'With this configuration any query that requests Query.todos',
    },
    {
      id: 'post-16',
      vote: 35,
      title: 'Russian president coup',
      content:
        'It\'s worth noting that it doesn\'t matter whether the TodosQuery is the same one that you use in your application code.',
    },
    {
      id: 'post-121',
      title: 'Avatar with badge',
      vote: 2,
      content:
        'In some products, you might need to show a badge on the right corner of the avatar, which we call a badge. Heres an example that shows if the user is online:',
    },
    {
      id: 'post-22',
      vote: 35,
      title: 'Chakra UI intro',
      content:
        'In some cases, you might need to stack avatars as a group. Use the AvatarGroup component.application code.',
    },
  ]

  return (
    <Layout>
      <Heading as="h3" size="lg">
        3i Insite Blog
      </Heading>

      <MediaUpload></MediaUpload>

      <CreatePost></CreatePost>

      {posts.map((post) => (
        <Post key={post.id} data={post}></Post>
      ))}
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient)(UploadImage)
