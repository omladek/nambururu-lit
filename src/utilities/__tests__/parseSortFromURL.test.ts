import { describe, test, expect } from 'vitest'

import parseSortFromURL from '../parseSortFromURL'

import sortOptions from '../../constants/sortOptions'

describe('parseSortFromURL', () => {
  test('should extract the sort value from the input string', () => {
    const input = '/?subreddit=AmItheAsshole&sort=best'
    const subreddit = parseSortFromURL(input)
    expect(subreddit).toBe('best')
  })

  test('should return null if sort parameter is not found', () => {
    const input = '/?query=test'
    const subreddit = parseSortFromURL(input)
    expect(subreddit).toBeNull()
  })

  test('should ignore invalid characters from sort', () => {
    const input = '/?subreddit=foo&sort=hot</>,*-'
    const subreddit = parseSortFromURL(input)
    expect(subreddit).toBe('hot')
  })

  test('should ignore escaped characters from sort', () => {
    const input = '/?subreddit=foo&sort=new%3C%2F%3E%2C*-%20'
    const sort = parseSortFromURL(input)
    expect(sort).toBe('new')
  })

  test('should ignore invalid value of sort', () => {
    const input = '/?subreddit=foo&sort=wrong'
    const sort = parseSortFromURL(input)
    expect(sort).toBeNull()
  })

  sortOptions.forEach((sortOption) => {
    test(`should parse ${sortOption} from sort`, () => {
      const input = `/?subreddit=foo&sort=${sortOption}`
      const sort = parseSortFromURL(input)
      expect(sort).toBe(sortOption)
    })
  })
})
