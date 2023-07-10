import { BasicSubreddit } from '../constants/basicSubreddits'

export default function parseSubredditFromURL(
  input: string,
): BasicSubreddit | string | null {
  const pattern = /subreddit=([\w-]+)/
  const match = input.match(pattern)

  if (match && match.length > 1) {
    return match[1]
  }
  return null
}
