import React from 'react'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlCLient'
import MediaUpload from '../components/MediaUpload'

const UploadImage = ({ }) => {

  return (
    <div>
      <MediaUpload></MediaUpload>
    </div>
  )
}

export default withUrqlClient(createUrqlClient)(UploadImage)
