import React from 'react'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlCLient'
import MediaUpload from '../components/MediaUpload'
import Layout from '../components/Layout'


const UploadImage = ({ }) => {

  return (
    <Layout>
      <MediaUpload></MediaUpload>
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient)(UploadImage)
