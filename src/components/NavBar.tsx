import React from 'react'
import { Box, Link, Flex, Button } from '@chakra-ui/core'
import NextLink from 'next/link'
import { useMeQuery, useLogoutMutation } from '../generated/graphql'


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

  if (fetching) {
    body = (
      <div>Loading...</div>
    )
  } else if (!data?.me) {
    body = (
      <>
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
      </>
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
      p={2}
      zIndex={1}
      position="sticky"
      top={0}
    >
      <Box ml={'auto'}>{body}</Box>
    </Flex>
  )
}
