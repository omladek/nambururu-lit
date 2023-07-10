import { describe, test, expect } from 'vitest'

import parseSubredditFromURL from '../parseSubredditFromURL'
import basicSubreddits from '../../constants/basicSubreddits'

describe('parseSubredditFromURL', () => {
  test('should extract the subreddit value from the input string', () => {
    const input = '/?subreddit=AmItheAsshole'
    const subreddit = parseSubredditFromURL(input)
    expect(subreddit).toBe('AmItheAsshole')
  })

  test('should return null if subreddit parameter is not found', () => {
    const input = '/?query=test'
    const subreddit = parseSubredditFromURL(input)
    expect(subreddit).toBeNull()
  })

  test('should ignore invalid characters from subreddit', () => {
    const input = '/?subreddit=foo</>,*-&sort=hot'
    const subreddit = parseSubredditFromURL(input)
    expect(subreddit).toBe('foo')
  })

  test('should ignore escaped characters from subreddit', () => {
    const input = '/?subreddit=new%3C%2F%3E%2C*-%20&sort=best'
    const sort = parseSubredditFromURL(input)
    expect(sort).toBe('new')
  })

  basicSubreddits.forEach((basicSubreddit) => {
    test(`should parse ${basicSubreddit} from subreddit`, () => {
      const input = `/?subreddit=${basicSubreddit}&sort=best`
      const sort = parseSubredditFromURL(input)
      expect(sort).toBe(basicSubreddit)
    })
  })
})
