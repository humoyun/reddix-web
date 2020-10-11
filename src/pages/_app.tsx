import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core'

import theme from '../theme'
import Layout from '../components/Layout'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlCLient'

const MyApp = ({ Component, pageProps }: any) => {
  return (
    <ThemeProvider theme={theme}>
      {/* <ColorModeProvider> */}
      <CSSReset />
      <Layout>
        <Component {...pageProps} />
      </Layout>
      {/* </ColorModeProvider> */}
    </ThemeProvider>
  )
}

export default withUrqlClient(createUrqlClient)(MyApp)
// export default MyApp;
