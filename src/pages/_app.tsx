import { ChakraProvider, CSSReset } from '@chakra-ui/core'

import Theme from '@/theme'
import AppLayout from '@/layouts/AppLayout'
import AuthLayout from '@/layouts/AuthLayout'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '@/utils/createUrqlClient'
import { useRouter } from 'next/router'

import UserContext from '@/utils/userContext'
// import { useEffect, useState } from 'react'
import { useMeQuery } from '@/generated/graphql'


/**
 * 
 * https://reacttricks.com/sharing-global-data-in-next-with-custom-app-and-usecontext-hook
 * 
 * https://reacttricks.com/nested-dynamic-layouts-in-next-apps
 * 
 * https://reacttricks.com/learn-react-by-building-websites-with-next
 * 
 */
const ReddixApp = ({ Component, pageProps }) => {
  const [{ data, fetching }] = useMeQuery({
    pause: typeof window === 'undefined' || typeof window === undefined
  })
  const router = useRouter()

  return (
    <UserContext.Provider
      value={{
        user: data,
        fetching: fetching
      }}>
      <ChakraProvider theme={Theme}>
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
    </UserContext.Provider>
  )
}

/**
 * 
 * Next.js uses the App component to initialize pages. You can override it and control the page initialization. 
 * Which allows you to do amazing things like:
   - Persisting layout between page changes
   - Keeping state when navigating pages
   - Custom error handling using componentDidCatch
   - Inject additional data into pages
   - Add global CSS
 * 
 */

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// ReddixApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }


export default withUrqlClient(createUrqlClient)(ReddixApp)