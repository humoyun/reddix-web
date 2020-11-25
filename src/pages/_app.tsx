import { ChakraProvider, CSSReset } from '@chakra-ui/core'

import theme from '@/theme'
import AppLayout from '@/layouts/AppLayout'
import AuthLayout from '@/layouts/AuthLayout'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '@/utils/createUrqlClient'
import { useRouter } from 'next/router'

const MyApp = ({ Component, pageProps }) => {

  const router = useRouter()



  return (
    <ChakraProvider theme={theme}>
      {/* <ColorModeProvider> */}
      <CSSReset />

      {router.pathname.startsWith('/auth/')
        ? 
          <AuthLayout>
            <Component {...pageProps} />
          </AuthLayout>
          : 
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        }


      {/* </ColorModeProvider> */}
    </ChakraProvider>
  )
}

export default withUrqlClient(createUrqlClient)(MyApp)
// export default MyApp;
