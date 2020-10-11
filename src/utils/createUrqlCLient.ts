import { dedupExchange, Exchange, fetchExchange } from 'urql'
import { MeDocument, LoginMutation, MeQuery, LogoutMutation } from '../generated/graphql'
import { cacheExchange } from '@urql/exchange-graphcache'
import { pipe, tap } from 'wonka'

function betterUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any)
}


const errorExchange: Exchange = ({ forward }) => (ops$) => {
  return pipe(
    forward(ops$),
    tap(({ error }) => {
      if (error?.message.includes('not authenticated')) {
        Router.replace('/login')
      }
    })
  )
}


export const createUrqlClient = (ssrExchange: any) => ({
  // requestPolicy: "cache-first" | "cache-only" | "network-only" | "cache-and-network",
  url: 'http://localhost:4400/graphql',
  fetchOptions: {
    credentials: 'include' as const,
    // headers: {
    //   Authorization: ctx
    //     ? `Bearer ${ctx?.req?.headers?.Authorization ?? ""}`
    //     : localStorage.getItem("token") ?? "",
    // }
  },
  exchanges: [
    dedupExchange,
    // Replace the default cacheExchange with the new one
    cacheExchange({
      updates: {
        Mutation: {
          logout: (_result, args, cache, info) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              () => ({ me: null })
            )
          },

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
        },
      },
    }),
    errorExchange,
    ssrExchange,
    fetchExchange,
  ],
}) 