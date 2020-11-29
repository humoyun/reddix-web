import React, { useState } from 'react'
import { Flex } from '@chakra-ui/core'

import GiveAward from '@/icons/give-award.svg'
import PostSave from '@/icons/post-save.svg'
import PostUnsave from '../icons/post-unsave.svg'
import Share from '@/icons/arrow-share.svg'
import Comments from '@/icons/comments.svg'
import { Post } from '../generated/graphql'

import styled from '@emotion/styled'
// import { useRouter } from 'next/router'

interface PostProps {
  data?: Partial<Post>
}

const PostButton = styled.div`  
  display: inline-flex;
  padding: 2px 4px;
  flex-direction: row;
  font-size: 10px;
  border-radius: 3px;
  transition: background-color 0.2s ease-in;
  margin-left: 4px;

  span {
    display: inline-block;
    margin-left: 2px;
  }

  &:hover {
    background-color: #e1e2e4;
  }
`

const PostFooter = ({ data }: PostProps) => {
  const [isSaved, setIsSaved] = useState(Math.round(Math.random()))
  console.log(data)
  const command = (_: React.SyntheticEvent, cmd: string) => {
    console.log('command', cmd)
    
    if (cmd === 'bookmark') {
      setIsSaved((old) => (old + 1)%2)
    } else if (cmd === 'share') { 
      console.log()
    }
  }

  return (
    <Flex direction="row" align="center" mt={2} className="post-footer">
      <PostButton onClick={(e) => command(e, 'give-award')}>
        <GiveAward
          style={{ fill: '#455A64' }}
          width={16}
          height={16}
        />
        <span>123</span>
        <span>Give Award</span>
      </PostButton>

      <PostButton onClick={(e) => command(e, 'comments')}>
        <Comments
          style={{ fill: '#455A64' }}
          width={16}
          height={16}
          />
        <span>Comments</span>
      </PostButton>

      <PostButton onClick={(e) => command(e, 'share')}>
        <Share
          style={{ fill: '#455A64' }}
          width={16}
          height={16}
          />  
        <span>Share</span>
      </PostButton>

      <PostButton onClick={(e) => command(e, 'bookmark')}>
        {isSaved ?
          <PostUnsave
            style={{ fill: '#455A64' }}
            width={16}
            height={16} /> :
          <PostSave
            style={{ fill: '#455A64' }}
            width={16}
            height={16} />
        }
        {isSaved ? <span>Unsave</span>: <span>Save</span>}
      </PostButton>

    </Flex>
  )
}

export default PostFooter