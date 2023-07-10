import containsKeyword from './containsKeyword'
import { ChildData } from '../types/reddit-api/ThreadsResult.type'

export default function isBlockedPost(
  { stickied, subreddit, title }: ChildData,
  blockedSubreddits: string[],
  blockedTitleKeywords: string[],
): boolean {
  // ignore moderator notices, etc.
  if (stickied) {
    return true
  }

  // blocked by user subreddit(s) preferences
  if (blockedSubreddits.includes(subreddit.toLowerCase())) {
    return true
  }

  // blocked by user title keyword(s) preferences
  return containsKeyword(blockedTitleKeywords, title)
}
