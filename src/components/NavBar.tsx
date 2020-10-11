import React from 'react'
import { Box, Link, Flex, Button, InputGroup, InputLeftElement, Input, Heading } from '@chakra-ui/core'
import NextLink from 'next/link'
import { useMeQuery, useLogoutMutation } from '../generated/graphql'
import SearchIcon from '../icons/search.svg'
import ReddirLogo from '../icons/reddit-social-logo.svg'

export interface NavBarProps {
  dummy?: string
} 

export const NavBar: React.FC<NavBarProps> = ({ }) => {
  const [{ data, fetching }] = useMeQuery({
    pause: typeof window === 'undefined' || typeof window === undefined
  })
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation()
  let body = null
  console.log('data me : ', data)

  if (!data?.me) {
    body = (
      <div>
        <NextLink href="/login">
          <Button mr={3} size="sm" variant="outline">
            Login
          </Button>
        </NextLink>

        <NextLink href="/register">
          <Button mr={8} size="sm">
            Register
          </Button>
        </NextLink>
      </div>
    )
  } else { 
    body = (
      <Flex alignItems="center">
        <Box mr={5}>{data.me.username}</Box>
        <Button
          size="xs"
          isLoading={logoutFetching}
          onClick={() => { 
            logout()
          }}>
          logout
        </Button>
      </Flex>
    )
  } 

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
      <Flex alignItems="center" flex={1}>
        {/* <Box ml={4}>
          <ReddirLogo width={38} height={38} style={{ fill: 'black' }} />
        </Box>
        <Heading ml={2} as="h3" size="md">
          Reddir
        </Heading> */}
      </Flex>

      {data?.me && (
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
          </InputGroup>
        </Box>
      )}

      <Flex justifyContent="flex-end" flex={1} mr={5}>
        {body}
      </Flex>
    </Flex>
  )
}
