import React, { useContext } from 'react'
import {  Box, Button, CloseButton, Flex, useToast } from '@chakra-ui/core'
import styled from '@emotion/styled'
import { Post, useVoteMutation } from '../../generated/graphql'
import Downvote from '@/icons/arrow-down.svg'
import Upvote from '@/icons/arrow-up.svg'
import Info from '@/icons/info.svg'
import UserContext from '@/utils/userContext'

interface VoterProps {
  post: Post;
  children?: React.ReactDOM
}

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  flex-direction: column;
`

enum VoteState {
  UPVOTE = 1,
  NEUTRAL = 0,
  DOWNVOTE = -1,
}

const Voter = ({ post }: VoterProps) => {
  const [voteStatus, setVoteStatus] = React.useState<VoteState | null>(post.voteStatus)
  const [loadingStatus, setLoadingStatus] = React.useState<'upvoting' | 'downvoting' | 'stable'>('stable')
  const { user }: any = useContext(UserContext) 
  const [ , vote] = useVoteMutation()
  const toast = useToast()

  
  const handleVote = async (action: string) => {
    if (!user.me) {
      // TODO: make separate hook or component for this custom toast
      toast({
        position: 'bottom',
        duration: 3000,
        isClosable: true,
        render: ({ onClose }) => (
          <Box borderRadius={5} bg="teal.100" p={2} display="inline-block">
            <Flex flex="1" position="relative">
              <Flex padding={2} alignItems="flex-start">
                <Info width={18} height={18} style={{ fill: '#333' }}></Info>
              </Flex>
              <Flex flexDirection="column">
                <Box letterSpacing="wide" fontWeight="bold">Login to vote!</Box>
                <Box>You need to login in order to vote a post</Box>
              </Flex>
              <CloseButton position="absolute" right="-5px" top="-5px" onClick={() => onClose()} />
            </Flex>
          </Box>
      ),
      })
      
      return
    }

    let temp = 0
    if (action === 'up') {
      if (voteStatus===1) {
        temp = -1
      } else if (voteStatus===-1) {
        temp = 2
      } else {
        temp = 1
      }
      setLoadingStatus('upvoting')
    } else {
      if (voteStatus===-1) {
        temp = 1
      } else if (voteStatus===1) {
        temp = -2
      } else {
        temp = -1
      }
      setLoadingStatus('downvoting')
    } 
    
    try {
      
      const {data, error } = await vote({ postId: post.id, val: temp })
      setLoadingStatus('stable')
      if (data?.vote.success) {
        setVoteStatus(voteStatus+temp)
        console.log('vote({ postId: post.id, val: temp }) ', data, error)
      } else {
        
      }
      
    } catch (err) {
      console.error('vote error ', err)
    }
  }


  return (
    <Box
    w={10}
    p={1}
    fontSize={12}
    bg="gray.50"
    borderTopLeftRadius={2}
    borderBottomLeftRadius={2}
  >
    <Wrapper>
      <Button 
        isLoading={loadingStatus==='upvoting'}
        onClick={() => handleVote('up')} 
        variant="solid" size="xs" padding={0}>
        <Upvote
          style={{ fill: voteStatus!==1 ? '#8c8c8c' : 'green', userSelect: 'none' }}
          width={18}
          height={18} />
      </Button>

      <Box userSelect="none">{post.points}</Box>

      <Button 
        isLoading={loadingStatus==='downvoting'}
        onClick={() => handleVote('down')} 
        variant="solid" size="xs" padding={0}>
        <Downvote
          style={{ fill: voteStatus!==-1 ? '#8c8c8c' : 'red' }}
          width={18}
          height={18} />
      </Button>

    </Wrapper>
  </Box>
  )
}

export default Voter