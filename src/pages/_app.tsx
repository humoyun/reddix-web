import { ChakraProvider, CSSReset } from '@chakra-ui/core'

import theme from '@/theme'
import Layout from '@/layouts/Layout'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '@/utils/createUrqlClient'

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      {/* <ColorModeProvider> */}
      <CSSReset />
      <Layout>
        <Component {...pageProps} />
      </Layout>
      {/* </ColorModeProvider> */}
    </ChakraProvider>
  )
}

export default withUrqlClient(createUrqlClient)(MyApp)
// export default MyApp;
