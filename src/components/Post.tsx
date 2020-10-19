import React, { useState } from 'react'
import { Flex, Box, Heading } from '@chakra-ui/core'
import Downvote from '../icons/arrow-down.svg'
import Upvote from '../icons/arrow-up.svg'

import GiveAward from '../icons/give-award.svg'
import PostSave from '../icons/post-save.svg'
import PostUnsave from '../icons/post-unsave.svg'
import Share from '../icons/arrow-share.svg'
import Comments from '../icons/comments.svg'

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

const FlexCore = styled.div`
  display: flex;
  flex-direction: row;
`

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
  height: 100%;
  align-items: center;
  flex-direction: column;
`

const PostHeader = styled(FlexCore)`
  height: 100%;
`
const PostContent = styled(FlexCore)`
  height: 100%;
`
const PostFooter = styled(FlexCore)`
  height: 100%;
  align-items: center;
`

const PostButton = styled.div`  
  display: inline-flex;
  padding: 2px 4px;
  flex-direction: row;
  font-size: 10px;
  border-radius: 3px;
  transition: background-color 0.2s ease-in;
  margin-left: 2px;

  span {
    display: inline-block;
    margin-left: 2px;
  }

  &:hover {
    background-color: #e1e2e4;
  }
`

export const Post = ({ data }: PostProps) => {
  const [vote, setVote] = useState(data.points)
  const router = useRouter()

  const handlePostClick = () => {
    console.log('handlePostClick')
    router.push(`/post/${data.id}`)
  }

  const command = (e: React.SyntheticEvent, cmd: string) => {
    console.log('command', cmd)
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
          <PostButton>
            <GiveAward
              onClick={(e) => command(e, 'share')}
              style={{ fill: '#455A64' }}
              width={16}
              height={16}
            />
            <span>123</span>
            <span>Comments</span>
          </PostButton>

          <PostButton>
            <Comments
              onClick={(e) => command(e, 'share')}
              style={{ fill: '#455A64' }}
              width={16}
              height={16}
              />
            <span>Give Award</span>
          </PostButton>

          <PostButton>
            <Share
              onClick={(e) => command(e, 'share')}
              style={{ fill: '#455A64' }}
              width={16}
              height={16}
              />  
            <span>Share</span>
          </PostButton>

          <PostButton>
            <PostSave
              onClick={(e) => command(e, 'share')}
              style={{ fill: '#455A64' }}
              width={16}
              height={16}
            />
            <span>Save</span>
          </PostButton>

        </PostFooter>
      </Flex>
    </Flexbox>
  )
}