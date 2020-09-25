import React, { useState } from 'react'
import { Flex, Box, Heading } from '@chakra-ui/core'
import Downvote from '../icons/down-arrow.svg'
import Upvote from '../icons/up-arrow.svg'

interface PostProps {
  data: PostData;
}

export interface PostData {
  id: string;
  title: string;
  content: string;
  vote: number;
}

export const Post = ({ data }: PostProps) => {
  const [vote, setVote] = useState(data.vote)
  const handlePostClick = () => {
    console.log('handlePostClick')
  }
  
  const handleVote = (e: React.SyntheticEvent, vote: string) => {
    e.stopPropagation()
    if (vote === 'up') setVote((v) => v + 1)
    else setVote((v) => v - 1)
    console.log('vote for post ', vote)
  }

  return (
    <Flex
      flexDirection="row"
      minH={100}
      my={5}
      border="1px"
      borderRadius={3}
      borderColor="lightgrey"
      _hover={{
        borderColor: 'black',
      }}
      cursor="pointer"
      onClick={() => handlePostClick()}
    >
      <Box
        w={10}
        p={1}
        fontSize={12}
        bg="gray.50"
        borderTopLeftRadius={2}
        borderBottomLeftRadius={2}
      >
        <Flex alignItems="center" flexDirection="column" >
          <Upvote
            onClick={(e) => handleVote(e, 'up')}
            style={{ fill: 'red' }}
            width={15}
            height={15}
          ></Upvote>
          <Box userSelect="none">{vote}</Box>
          <Downvote
            onClick={(e) => handleVote(e, 'down')}
            style={{ fill: '#455A64' }}
            width={15}
            height={15}
          ></Downvote>
        </Flex>
      </Box>

      <Flex
        flex={1}
        bg="#fff"
        p={1}
        flexDirection="column"
        borderTopRightRadius={2}
        borderBottomRightRadius={2}
      >
        <Heading as="h4" size="sm">
          {data.title}
        </Heading>
        <Box fontSize={14}>{data.content}</Box>
      </Flex>
    </Flex>
  )
}