import { dedupExchange, Exchange, fetchExchange } from 'urql'
import { MeDocument, LoginMutation, MeQuery, LogoutMutation } from '../generated/graphql'
import { cacheExchange, Cache, QueryInput } from '@urql/exchange-graphcache'
import { devtoolsExchange } from '@urql/devtools'
import { pipe, tap } from 'wonka'
import Router from 'next/router'
import gql from 'graphql-tag'
import { cursorPagination } from './cursorPagination'

const isServer = () => typeof window === 'undefined' || typeof window === undefined

function betterUpdateQuery<Result, Query>(
  cache: Cache,
  queryInput: QueryInput,
  result: any,
  handler: (res: Result, query: Query) => Query
) {
  return cache.updateQuery(queryInput, (data) => handler(result, data as any) as any)
}


const errorExchange: Exchange = ({ forward }) => (ops$) => {
  return pipe(
    forward(ops$),
    tap(({ error }) => {
      if (error?.message.includes('not authenticated')) {
        Router.replace('/auth/login')
      }
    })
  )
}

export const createUrqlClient = (ssrExchange: any, ctx: any) => {
  console.log()
  let cookie = ''
  // we need send cookie in the initial load as ssr does not send cookie in the initial load

  // ssr : browser => next.js sever (cookie not being forwarded) => graphql-api 
  // csr : browser => graphql-api
  if (isServer()) {
    cookie = ctx?.req.headers.cookie 
  }

  return {
    // requestPolicy: "cache-first" | "cache-only" | "network-only" | "cache-and-network",
    url: 'http://localhost:4400/graphql',
    fetchOptions: {
      credentials: 'include' as const,
      headers: cookie ? {
        cookie
        // Authorization: ctx
        //   ? `Bearer ${ctx?.req?.headers?.Authorization ? ''}`
        //   : localStorage.getItem("token") ?? "",
      } : undefined
    },
    exchanges: [
      devtoolsExchange,
      dedupExchange,
      // Replace the default cacheExchange with the new one
      cacheExchange({
        // `keys` may be used to alter how Graphcache generates the key it uses for normalization for individual types. 
        // The key generator function may also always return null when a type should always be embedded.
        keys: {
          PaginatedPosts: () => null
        },
        // **
        resolvers: {
          Query: {
            posts: cursorPagination()
          }
        },
        // **  
        updates: {
          Mutation: {
            vote: (_result, args, cache, _) => {
              const { postId, val } = args as { postId: string, val: number }
              const fq = gql`
                fragment _ on Post {
                  id
                  points
                  voteStatus
                } 
              `
              const data = cache.readFragment(fq, { id: postId } as any)
              
              if (data) {
                if (data.voteStatus === val) {
                  return
                }
                const newPoints = (data.points as number) + val
                const fm = gql`
                  fragment _ on Post {
                    points
                    voteStatus
                  }
                `
                cache.writeFragment(fm, { id: postId, points: newPoints, voteStatus: val })
              }
            },

            /**
             * when we create new post we need to show it at the top of the feed
             * so invalidating first pagination results
             */
            createPost: (_result, _, cache, __) => {
              const allFields = cache.inspectFields('Query')
              const fieldInfos = allFields.filter((info) => info.fieldName === 'posts')
              fieldInfos.forEach((fi) => {
                cache.invalidate('Query', 'posts', fi.arguments || {})
              })
              console.log(cache.inspectFields('Query'))
            },
            /**
             * 
             */
            logout: (_result, _, cache, __) => {
              betterUpdateQuery<LogoutMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                () => ({ me: null })
              )
            },
            /**
             * 
             */
            login: (_result, args, cache, info) => {
              betterUpdateQuery<LoginMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (res, query) => {
                  if (res.login.errors) {
                    return query
                  } else {
                    return {
                      me: res.login.user,
                    }
                  }
                }
              )
            },
            /**
             * 
             */
          },
        },
      }),
      errorExchange,
      ssrExchange,
      fetchExchange,
    ],
  }
}