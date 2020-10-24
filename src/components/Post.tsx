import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Flex, Box, Heading } from '@chakra-ui/core'
import Downvote from '../icons/arrow-down.svg'
import Upvote from '../icons/arrow-up.svg'
import styled from '@emotion/styled'
import PostFooter from './PostFooter'

interface PostProps {
  data: PostData;
}

export interface PostData {
  id: string;
  title: string;
  textSnippet: string;
  points: number;
}

const FlexCore = styled.div`
  display: flex;
  flex-direction: row;
`

const Flexbox = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100px;
  margin: 15px 0;
  border: 1px solid #fff;
  box-shadow: 0 2px 4px 0 hsla(0, 0%, 0%, 0.1);
  border-radius: 3px;
  cursor: pointer;
  transition: box-shadow 0.1s ease-in;

  &:hover {
    // border-color: black;
    border: 1px solid lightgrey;
  }
`

const Rightbox = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  flex-direction: column;
`

const PostHeader = styled(FlexCore)`
  height: 100%;
`
const PostContent = styled(FlexCore)`
  height: 100%;
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
    <Flexbox>
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
        <PostHeader className="post-header">

        </PostHeader>

        <PostContent className="post-content" onClick={() => handlePostClick()}>
          <Heading as="h4" size="sm">
            {data.title}
          </Heading>
          <Box fontSize={14}>{data.textSnippet}</Box>
        </PostContent>

        <PostFooter className="post-footer">

        </PostFooter>
      </Flex>
    </Flexbox>
  )
}