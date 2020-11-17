import React from 'react'
import { Box } from '@chakra-ui/core'

interface MediaUploadProps {
  multiple?: boolean;
  drag?: boolean;
  type?: string;
  accept?: string;
  encType?: string
}

const MediaUpload = (props: MediaUploadProps): JSX.Element => {
  return (
    <Box>
      <input
        style={{ display: 'none' }}
        type="file"
        encType="multipart/form-data"
        {...props}
      />
    </Box>
  )
}

export default MediaUpload