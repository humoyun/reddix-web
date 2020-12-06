import React from 'react'
import { Flex, Box, Input, Avatar } from '@chakra-ui/core'
import LinkIcon from '@/icons/link.svg'
import MediaIcon from '@/icons/media.svg'
import { useRouter } from 'next/router'

export const PostInput = (props: any) => {
  const router = useRouter()
  const handleClick = (_: React.SyntheticEvent, type: string) => {
    console.log('handleClick', type, props)
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

      <Flex flex="2">
        <Input size="sm" onClick={(e) => handleClick(e, 'text')}></Input>
      </Flex>

      <Flex ml={3} justifyContent="space-around">
        <Box mr={2}>
          <MediaIcon
            onClick={(e) => handleClick(e, 'media')}
            style={{ fill: '#ccc', cursor: 'pointer' }}
            width={20}
            height={20}
          />
        </Box>

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

