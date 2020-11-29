import React from 'react'
import { Center } from '@chakra-ui/core'

interface LayoutProps { 
  variant?: 'small' | 'regular';
  children?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children })=> {
  return (
    <Center
      className="reddix-app"
      bg="#f4f5f7"
      w="100%"
      h="100%"
      minH="100vh">
      {children}
    </Center>
  )
}

export default Layout