import {
  CommentsResult,
  NormalizedComment,
} from '../types/reddit-api/CommentsResult.type'
import getUniqueComments from './getUniqueComments'

export default async function getCommentsPreview(
  id: string,
  signal: AbortSignal | undefined,
): Promise<NormalizedComment[]> {
  const response = await Promise.all([
    fetch(
      `https://www.reddit.com/comments/${id}/.json?limit=2&sort=best&json_raw=1`,
      { signal },
    ).then(async (response) => {
      const comments: CommentsResult[] = await response.json()

      return { comments, voteResult: 'best' }
    }),
    fetch(
      `https://www.reddit.com/comments/${id}/.json?limit=2&sort=controversial&json_raw=1`,
      { signal },
    ).then(async (response) => {
      const comments: CommentsResult[] = await response.json()

      return { comments, voteResult: 'controversial' }
    }),
  ])

  return getUniqueComments(response)
}
