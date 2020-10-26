// import { stringifyVariables } from '@urql/core'
import { Resolver } from '@urql/exchange-graphcache'
import { stringifyVariables } from 'urql'

export const cursorPagination = (): Resolver => {

  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info
    console.log('0-------------0')
    console.log(entityKey, fieldName)

    const allFields = cache.inspectFields(entityKey)
    console.log('allFields : ', allFields)
    const fieldInfos = allFields.filter(fInfo => fInfo.fieldName === fieldName)
    const size = fieldInfos.length

    if (size === 0) {
      return undefined
    }

    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`
    const key1 = cache.resolveFieldByKey(entityKey, fieldKey)
    const isItInCache = cache.resolve(key1, 'posts')
    
    /**
     * partial: ?boolean
     * 
     * This may be set to true at any point in time (by your custom resolver or by Graphcache) 
     * to indicate that some data is uncached and missing
     */
    info.partial = !isItInCache

    const results: string[] = []
    let hasMore = true

    fieldInfos.forEach(fin => { 
      const key = cache.resolveFieldByKey(entityKey, fin.fieldKey) as string[]
      
      const data = cache.resolve(key, 'posts')
      const _hasMore = cache.resolve(key, 'hasMore')
      if(!_hasMore) hasMore = _hasMore

      results.push(...data) 
    }) 

    return {
      // __typename: 'PaginatedPosts', // very problematic
      hasMore, 
      posts: results
    }
  } 
}