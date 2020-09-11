import React from 'react';
import { Box, Link, Flex, Button } from '@chakra-ui/core';
import NextLink from 'next/link'
import { useMeQuery, useLogoutMutation } from '../generated/graphql';


export interface NavBarProps {
} 

export const NavBar: React.FC<NavBarProps> = ({ }) => {
  const [{ data, fetching }] = useMeQuery({
    pause: typeof window === "undefined" || typeof window === undefined
  });
  const [{ fetching: logoutFetching },logout] = useLogoutMutation()
  let body = null;
  console.log("data me : ", data)

  if (fetching) {
    body = (
      <div>Loading...</div>
    )
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/register">
          <Link color="#fff" mr={5}>
            Register
          </Link>
        </NextLink>

        <NextLink href="/login">
          <Link color="#fff">Login</Link>
        </NextLink>
      </>
    )
  } else { 
    body = (
      <Flex alignItems="center">
        <Box mr={5} color="#fff">{data.me.username}</Box>
        <Button
          size="xs"
          isLoading={logoutFetching}
          onClick={() => { 
            logout();
          }}>
          logout
        </Button>
      </Flex>
    );
  } 

  return (
    <Flex bg="#14416b" p={4}>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
}
