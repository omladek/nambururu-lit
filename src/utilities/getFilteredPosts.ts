import parseStorage from './parseStorage'
import Storage from '../constants/storage'
import isBlockedPost from './isBlockedPost'
import getCrossPost from './getCrossPost'
import { Thread, ChildData } from '../types/reddit-api/ThreadsResult.type'
import debug from './debug'

const getFilteredPosts = (posts: Thread[]): ChildData[] => {
  const myBlockedSubreddits = parseStorage(Storage.BLOCKED_SUBREDDITS)
  const myBlockedTitleKeywords = parseStorage(Storage.BLOCKED_TITLE_KEYWORDS)

  const filteredPosts: ChildData[] = []
  const postsTotal = posts.length

  for (let index = 0; index < postsTotal; index += 1) {
    const postData = getCrossPost(posts[index].data)

    if (!isBlockedPost(postData, myBlockedSubreddits, myBlockedTitleKeywords)) {
      filteredPosts.push(postData)
    } else {
      debug('filtered post:', postData)
    }
  }

  return filteredPosts
}

export default getFilteredPosts
