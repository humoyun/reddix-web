import React from 'react'
import { Box,  Flex, InputGroup, InputLeftElement, Input, InputRightElement, TagLabel, TagCloseButton, Tag } from '@chakra-ui/core'
// import NextLink from 'next/link'
// import { useMeQuery, useLogoutMutation } from '../generated/graphql'
import SearchIcon from '../icons/search.svg'
// import { useRouter } from 'next/router'

export interface SearchProps {
  dummy?: string
} 

export const Search: React.FC<SearchProps> = ({ }) => {

  return (
    <Flex
      alignItems="center"
      h={50}
      bg="#fff"
      borderBottom="1px"
      borderBottomColor="#ccc"
      p={2}
      zIndex={1}
      position="sticky"
      top={0}
    >
      <Box flex={3}>
        <InputGroup w="80%" mx="auto">
          <InputLeftElement
            padding={0}
            pointerEvents="none"
            children={
              <SearchIcon
                width="18px"
                height="18px"
                style={{ fill: 'grey' }}
              />
            }
          />
          <Input type="text" placeholder="Search...." />

          <InputRightElement width="50">
          <Tag
            size="md"
            variant="subtle"
            colorScheme="teal"
          >
            <TagLabel>Posts</TagLabel>
            <TagCloseButton />
          </Tag>
          </InputRightElement>
        </InputGroup>
      </Box>
      {/* Search results */}
      <Flex position="absolute"></Flex>
    </Flex>
  )
}
