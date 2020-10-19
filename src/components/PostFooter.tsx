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

export const PostFooter = ({ data }: PostProps) => {
  const [vote, setVote] = useState(data.points)
  const router = useRouter()

  const command = (e: React.SyntheticEvent, cmd: string) => {
    console.log('command', cmd)
  }

  return (
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
  )
}