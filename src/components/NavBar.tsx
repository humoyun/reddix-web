import React from 'react'
import { Box, Flex, Button, Heading, Stack, Tooltip, AvatarBadge, Avatar } from '@chakra-ui/core'
import styled from '@emotion/styled'
import NextLink from 'next/link'
import { useMeQuery, useLogoutMutation } from '../generated/graphql'
import { useRouter } from 'next/router'
import DarkMode from '@/icons/sun.svg'
// import New from '../icons/new.svg'
// import Rise from '../icons/rise.svg'
import Rocket from '@/icons/rocket.svg'
import AllPosts from '@/icons/all-chart.svg'


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

export const NavBar: React.FC<NavBarProps> = ({ }) => {
  const [{ data, fetching }] = useMeQuery({
    pause: typeof window === 'undefined' || typeof window === undefined
  })
  const router = useRouter()
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation()
  let body = null
  console.log('fetching : ', fetching)
  console.log('data me : ', data)

  const goHome = () => {
    router.push('/')
  }

  if (!data?.me) {
    body = (
      <Flex minW={100}>
        <NextLink href="/login">
          <Button mr={3} size="sm" variant="outline">
            Login
          </Button>
        </NextLink>
      </Flex>
    )
  } else { 
    body = (
      <Flex alignItems="center">
        <Avatar size="sm" name="Humoyun Ahmad" src="https://bit.ly/ryan-florence">
          <AvatarBadge  boxSize="1.25em" bg="green.500" />
        </Avatar>
        <Box mr={5} px={2}>{data.me.username}</Box>
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
      <Flex alignItems="center" flex={1} >
        <Box ml={4} onClick={goHome}>
          <img src="/reddix.png" style={{ width: 45, height: 45, cursor: 'pointer' }} />
        </Box>
        <Heading ml={2} as="h3" size="md">
          Cactus
        </Heading>
      </Flex>

      <Box flex={4}>
        {/* Search component TO-DO */}

      </Box>

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
        {body}
      </Flex>
    </Flex>
  )
}
