import React from 'react'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../../utils/createUrqlCLient'
import { useRouter } from 'next/router'

const SubredditPage: NextPage = ({}) => {
  const router = useRouter()
  return <div>{router.pathname}</div>
}

export default withUrqlClient(createUrqlClient, { ssr: true })(SubredditPage)
