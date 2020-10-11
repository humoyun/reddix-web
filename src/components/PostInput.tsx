import React from 'react'
import { Flex, Box, Input, Avatar } from '@chakra-ui/core'
import LinkIcon from '../icons/link.svg'
import MediaIcon from '../icons/media.svg'
import { useRouter } from 'next/router'

export const PostInput = (props: any) => {
  const router = useRouter()
  const handleClick = (e: React.SyntheticEvent, type: string) => {
    console.log('handleClick', type)
    router.push('/create-post')
  }

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      p={3}
      bg="#fff"
      w="100%"
      my={5}
      flexDirection="row"
    >
      <Avatar
        mr={3}
        size="sm"
        name="Ryan Florence"
        src="https://bit.ly/ryan-florence"
      ></Avatar>

      <Input size="sm" onClick={(e) => handleClick(e, 'text')}></Input>

      <Flex ml={2} w={60} justifyContent="space-around">
        <MediaIcon
          onClick={(e) => handleClick(e, 'media')}
          style={{ fill: '#ccc', cursor: 'pointer' }}
          width={20}
          height={20}
        />
        <LinkIcon
          onClick={(e) => handleClick(e, 'link')}
          style={{ fill: '#ccc', cursor: 'pointer' }}
          width={20}
          height={20}
        />
      </Flex>
    </Flex>
  )
}

