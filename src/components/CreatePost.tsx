import React from 'react'
import { Flex, Box, Input, Avatar } from '@chakra-ui/core'
// import PropTypes from 'prop-types'
import Link from '../icons/link.svg'
import Media from '../icons/media.svg'

export const CreatePost = (props: any) => {

  const handleClick = (e: React.SyntheticEvent, type: string) => {
    console.log('handleClick' , type)
  }

  return (
    <Flex alignItems="center" justifyContent="space-between" p={3} bg="#fff" w="100%" my={5} flexDirection="row">
      <Avatar mr={3} size="sm" name="Ryan Florence" src="https://bit.ly/ryan-florence"></Avatar>
      <Input size='sm'></Input>
      <Flex ml={2} w={60} justifyContent="space-around">
        <Media
          onClick={(e) => handleClick(e, 'up')}
          style={{ fill: '#ccc' }}
          width={20}
          height={20}
        ></Media>
        <Link
          onClick={(e) => handleClick(e, 'up')}
          style={{ fill: '#ccc' }}
          width={20}
          height={20}
        ></Link>
      </Flex>
    </Flex>
  )
}

