import {
  ChildData,
  NormalizedPost,
} from '../types/reddit-api/ThreadsResult.type'
import getNormalizedPost from './getNormalizedPost'

const getUniqueNormalizedPosts = (
  pages: Array<{
    posts: ChildData[]
    after: string | null
  }>,
): NormalizedPost[] => {
  const pagesTotal = pages.length
  const uniquePosts = new Map<string, NormalizedPost>()

  for (let index = 0; index < pagesTotal; index += 1) {
    pages[index].posts.forEach((post) => {
      uniquePosts.set(post.id, getNormalizedPost(post))
    })
  }

  return Array.from(uniquePosts, ([_, post]) => post)
}

export default getUniqueNormalizedPosts
