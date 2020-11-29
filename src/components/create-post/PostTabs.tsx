import React, { useState } from 'react'
import { Stack, StackDivider, Center, Text } from '@chakra-ui/core'
import LinkIcon from '@/icons/link.svg'
import ImgIcon from '@/icons/image.svg'
import TextIcon from '@/icons/right-quote-sign.svg'
import PollIcon from '@/icons/list-text.svg'

const PostTabs = () => {
  const [activeTab, setActiveTab] = useState('')

  const handleTabClick = (tab: string) => {
    console.log('tab onChange ', tab)
    setActiveTab(tab)
  }

  const textStyle: React.CSSProperties = {
    fontWeight: 'bold', 
    fontSize: '0.9em',
    letterSpacing: 'wide'
  }

  return (
    <Stack
    direction="row"
    flex="1" 
    spacing={0} 
    bgColor="#eer" 
    color="#455A64"
    divider={<StackDivider borderColor="red" />}
    >

    <Center flex="1"
      cursor='pointer'
      boxSizing='border-box'
      borderBottom='2px solid transparent'
      onClick={() => handleTabClick('text')}
      style={ activeTab==='text' ? { userSelect: 'none', background: 'rgb(7 255 244 / 14%)', borderBottom: '2px solid teal', color: 'teal' } : {}}
      _active={{
        background: '#f4f5f7',
        color: 'teal.500'
      }}>
      <TextIcon           
        style={{ fill: activeTab!=='text' ? '#455A64' : 'teal' }}
        width={14}
        height={14} />
      <Text ml={1} style={textStyle}>Text</Text>
    </Center>
    <Center 
      flex="1"
      onClick={() => handleTabClick('media')}>
      <ImgIcon           
        style={{ fill: '#455A64' }}
        width={16}
        height={16} />
      <Text ml={1} style={textStyle}>Image & Video</Text>
    </Center>
    <Center 
      flex="1"
      onClick={() => handleTabClick('link')}>
      <LinkIcon           
        style={{ fill: '#455A64' }}
        width={16}
        height={16} />
      <Text ml={1} style={textStyle}>Link</Text>
    </Center>
    <Center flex="1">
      <PollIcon           
        style={{ fill: '#455A64', fontWeight: 'bold' }}
        width={16}
        height={16} />
      <Text ml={1} style={textStyle}>Poll</Text>
    </Center>
  </Stack>
  )
}

export default PostTabs