import getSubredditJSONUrl from './getSubredditJSONUrl'
import { ThreadResult, ChildData } from '../types/reddit-api/ThreadsResult.type'
import getFilteredPosts from './getFilteredPosts'
import { SortOption } from '../constants/sortOptions'

interface Props {
  signal?: AbortSignal | undefined
  queryKey: readonly ['subreddit', string, SortOption]
  pageParam?: string | null
  postsCache?: ChildData[]
}

const getSubreddit = async ({
  pageParam = '',
  postsCache = [],
  queryKey,
  signal,
}: Props): Promise<{ posts: ChildData[]; after: string | null }> => {
  const [_, subreddit, sort] = queryKey
  let posts = postsCache

  const result = await fetch(
    getSubredditJSONUrl({ subreddit, after: pageParam, sort }),
    {
      signal,
    },
  )
    .then((response) => response.json())
    .then((response: ThreadResult) => {
      if (
        typeof response !== 'object' ||
        typeof response.data !== 'object' ||
        !Array.isArray(response.data.children)
      ) {
        throw new Error(JSON.stringify(response, null, 2))
      }

      return {
        posts: getFilteredPosts(response.data.children),
        after: response.data.after,
      }
    })
    .catch((err) => {
      if (err.name !== 'AbortError') {
        throw new Error(err.reason || err.message)
      }

      return {
        posts: [],
        after: null,
      }
    })

  posts = [...posts, ...result.posts]

  if (posts.length < 50 && result.after) {
    return getSubreddit({
      pageParam: result.after,
      signal,
      queryKey,
      postsCache: posts,
    })
  }

  return {
    ...result,
    posts,
  }
}

export default getSubreddit
