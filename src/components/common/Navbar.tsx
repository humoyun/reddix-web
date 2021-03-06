import React, { useContext } from 'react'
import { 
  Box, 
  Flex, 
  Button, 
  Heading, 
  Stack, 
  Tooltip, 
  AvatarBadge, 
  Avatar, 
  Link
} from '@chakra-ui/core'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import NextLink from 'next/link'

import DarkMode from '@/icons/sun.svg'
import Rocket from '@/icons/rocket.svg'
import AllPosts from '@/icons/all-chart.svg'
// import New from '../icons/new.svg'
// import Rise from '../icons/rise.svg'
import UserContext from '@/utils/userContext'
import { useLogoutMutation } from '../../generated/graphql'

const IconBox = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: #EDF2F7
  }
`

export interface NavBarProps {
  dummy?: string
} 

export const Navbar: React.FC<NavBarProps> = ({ }) => {
  const {user, fetching}: any = useContext(UserContext)

  const router = useRouter()
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation()
  let securePart = null

  console.log(' user :; :: ', user)
  console.log(' fetching :; :: ', fetching)

  const goHome = () => {
    router.push('/')
  }

  if (!user?.me) {
    securePart = (
      <Flex minW={100}>
        <NextLink href="/auth/login">
          <Button
            isLoading={fetching}
            mr={3} size="xs" variant="outline">
            login
          </Button>
        </NextLink>
      </Flex>
    )
  } else { 
    securePart = (
      <Flex alignItems="center">
        <Avatar size="sm" name="Humoyun Ahmad" src="https://bit.ly/ryan-florence">
          <AvatarBadge  boxSize="1.25em" bg="green.500" />
        </Avatar>
        <Box mr={5} px={2}>{user.me.username}</Box>
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
      <Flex alignItems="center" flex={1}>
        <Box ml={4} onClick={goHome}>
          <img src="/reddix-logo.png" style={{ width: 38, height: 38, cursor: 'pointer' }} />
        </Box>
        <Heading ml={2} as="h3" size="md" color="#09a7a7">
          Reddix
        </Heading>
      </Flex>

      <Box flex={4}>
        {/* Search component TO-DO */}

      </Box>

      <Flex minW={100}>
        <NextLink href="/create-post">
          <Button mr={3} size="sm" colorScheme="teal" variant="outline">
            create post
          </Button>
        </NextLink>
      </Flex>

      <Flex flex={1} justifyContent="center">

        <Stack direction="row" p={2}>
          <Tooltip hasArrow label="All" aria-label="All" fontSize="xs">
            <IconBox>
              <AllPosts
                style={{ fill: '#455A64' }}
                width={18}
                height={18} />
            </IconBox> 
          </Tooltip>
          <Tooltip hasArrow label="Best" aria-label="Best" fontSize="xs">
            <IconBox>
              <Rocket
                style={{ fill: '#455A64' }}
                width={18}
                height={18} />     
            </IconBox> 
          </Tooltip>  
        </Stack>
        <hr />
        <Stack direction="row" p={2}>
          <Tooltip hasArrow label="Dark mode!" aria-label="Dark mode" fontSize="xs">
            <IconBox>
              <DarkMode 
                style={{ fill: '#455A64' }}
                width={18}
                height={18} />
            </IconBox>
          </Tooltip>
        </Stack>

      </Flex>

      <Flex justifyContent="flex-end" flex={1} mr={5}>
        { securePart }
      </Flex>
    </Flex>
  )
}
