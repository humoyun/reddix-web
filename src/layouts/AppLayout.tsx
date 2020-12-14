import React from 'react'
import { Navbar } from '@/components/common/Navbar'
import { BodyWrapper } from '../components/common/BodyWrapper'
import { Box } from '@chakra-ui/core'

interface LayoutProps { 
  variant?: 'small' | 'regular';
  children?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children, variant })=> {
  return (
    <Box className="reddix-app" bg="#f4f5f7" w="100%" h="100%" minH="100vh">
      <Navbar></Navbar>
      <BodyWrapper variant={variant}>{children}</BodyWrapper>
    </Box>
  )
}

export default Layout