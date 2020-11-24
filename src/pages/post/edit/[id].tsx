import React from 'react'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '@/utils/createUrqlClient'
import { useRouter } from 'next/router'

const EditPage: NextPage = ({}) => {
  const router = useRouter()
  return <div>{router.pathname}</div>
}

export default withUrqlClient(createUrqlClient)(EditPage)
