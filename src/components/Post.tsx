import React, { useState } from 'react'
import { Flex, Box, Heading } from '@chakra-ui/core'
import Downvote from '../icons/down-arrow.svg'
import Upvote from '../icons/up-arrow.svg'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'

interface PostProps {
  data: PostData;
}

export interface PostData {
  id: string;
  title: string;
  textSnippet: string;
  points: number;
}

const Flexbox = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100px;
  margin: 10px 0;
  border: 1px solid lightgrey;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    border-color: black;
  }
`

const Rightbox = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  align-items: center;
  flex-direction: column;
`

export const Post = ({ data }: PostProps) => {
  const [vote, setVote] = useState(data.points)
  const router = useRouter()

  const handlePostClick = () => {
    console.log('handlePostClick')
    router.push(`/post/${data.id}`)
  }
  
  const handleVote = (e: React.SyntheticEvent, vote: string) => {
    e.stopPropagation()
    if (vote === 'up') setVote((v) => v + 1)
    else setVote((v) => v - 1)
    console.log('vote for post ', vote)
  }

  return (
    <Flexbox onClick={() => handlePostClick()}>
      <Box
        w={10}
        p={1}
        fontSize={12}
        bg="gray.50"
        borderTopLeftRadius={2}
        borderBottomLeftRadius={2}
      >
        <Rightbox>
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
        </Rightbox>
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
        <Box fontSize={14}>{data.textSnippet}</Box>
      </Flex>
    </Flexbox>
  )
}