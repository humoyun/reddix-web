import React from 'react'
import { Box } from '@chakra-ui/core'

interface WrapperProps {
  variant?: 'small' | 'regular';
}

export const BodyWrapper: React.FC<WrapperProps> = ({
  children,
  variant = 'regular',
}) => { 
  return (
    <Box
      mt={5}
      p={3}
      mx="auto"
      maxW={variant === "regular" ? "800px" : "400px"}
      w="70%"
      h="100%-50px"
    >
      {children}
    </Box>
  );
}
