import { Box, Flex, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/core'
import React from 'react'

export function PostLoading() {
  return (
  <Box padding="3" boxShadow="lg" bg="white">
    <Flex flexDirection="row" alignItems="center">
      <Box width={50}>
        <SkeletonCircle size="5" />
      </Box>
      <Skeleton width="50%" height="15px" />
    </Flex>
    <Flex flexDirection="row" alignItems="center">
      <Flex flex={5} flexDirection="column" mr={4}>
        <SkeletonText mt="3" noOfLines={3} spacing="1" />
      </Flex>
      <Flex flex={1}>
        <Skeleton width="100%" height="55px" />
      </Flex>
    </Flex>
  </Box>
  )
}
