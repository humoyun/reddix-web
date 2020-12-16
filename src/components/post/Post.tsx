import React from 'react'
import { useRouter } from 'next/router'
import { Flex, Box, Heading, Avatar, Text, Button, useToast, CloseButton } from '@chakra-ui/core'
import Downvote from '@/icons/arrow-down.svg'
import Upvote from '@/icons/arrow-up.svg'
import Dot from '@/icons/dot.svg'
import Info from '@/icons/info.svg'
import PostSave from '@/icons/post-save.svg'
import styled from '@emotion/styled'
import PostFooter from './PostFooter'
import { Post, useVoteMutation } from '@/generated/graphql'
import UserContext from '@/utils/userContext'

interface PostProps {
  post: Partial<Post>;
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

const Voter = styled.div`
  display: flex;
  height: 75%;
  align-items: center;
  flex-direction: column;
`

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 30px;

  span.header-item {
    margin-left: 4px;

    &.community-link {
      font-weight: bold;
      font-size: 14px;
    }
    
    &.community-link:hover {
      text-decoration: underline;
    }
  }
`

const PostContent = styled(FlexCore)`
  flex-direction: column;
  margin: 10px 0;
`

enum VoteState {
  UPVOTE = 1,
  NEUTRAL = 0,
  DOWNVOTE = -1,
}

// post.voteStatus should be in three states: 1, 0, -1
export const PostComponent = ({ post }: PostProps): JSX.Element => {
  const [voteStatus, setVoteStatus] = React.useState<VoteState | null>(post.voteStatus)
  const [loadingStatus, setLoadingStatus] = React.useState<'upvoting' | 'downvoting' | 'stable'>('stable')
  const router = useRouter()
  const toast = useToast()
  // const closeToastButtonRef = React.useRef<HTMLButtonElement>(null);
  
  const { user }: any = React.useContext(UserContext) 
  const [ , vote] = useVoteMutation()
  
  const handlePostClick = () => {
    console.log('handlePostClick')
    router.push(`/post/${post.id}`)
  }

  const handleVote = async (action: string) => {
    if (!user.me) {
      // TODO: make separate hook or component for this custom toast
      toast({
        position: 'bottom',
        duration: 3000,
        isClosable: true,
        render: ({ onClose }) => (
          <Box borderRadius={4} bg="#eee" p={2} display="inline-block" borderLeft='4px solid dodgerBlue'>
            <Flex flex="1" position="relative" >
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
        console.error(error)
      }
      
    } catch (err) {
      console.error('vote error ', err)
    }
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
        <Voter>
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

        </Voter>

        <Flex flexDirection="column" justifyContent='center' alignItems='center'>
          <PostSave
            style={{ fill: '#455A64' }}
            width={16}
            height={16} />   
          <Text>{Math.round(Math.random()*30)}</Text>       
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
        <PostHeader className="post-header">
          <span className="header-item avatar"><Avatar size="xs"></Avatar></span>
          <span className="header-item community-link"><a href="">r/bbcnews</a></span>
          <span className="header-item divider-dot"><Dot width={8} height={8} /></span>
          <span className="header-item text"><Text fontSize={12} color="#ccc">Posted by u/zendesk 12 hours ago</Text></span>
        </PostHeader>

        <PostContent className="post-content" onClick={() => handlePostClick()}>
          <Heading as="h4" size="sm">
            {post.title}
          </Heading>
          <Box fontSize={14}>{post.text?.slice(0, 100)}</Box>
        </PostContent>

        <PostFooter data={post} />
      </Flex>
    </Flexbox>
  )
}

// https://stackoverflow.com/questions/63252161/ts2322-property-children-does-not-exist-on-type-intrinsic-attributes-and-prop