import React from 'react'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlCLient'

const SearchPage = ({}) => {
  return (
    <div>
      Seerch Page
    </div>
  )
}

export default withUrqlClient(createUrqlClient)(SearchPage)
