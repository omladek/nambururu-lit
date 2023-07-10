import { expect, describe, it } from 'vitest'
import calculateDownvotes from '../calculateDownvotes'

describe('calculateDownvotes', () => {
  it('returns the correct number of downvotes when upvoteRatio is 0.5', () => {
    const result = calculateDownvotes(100, 0.5)
    expect(result).toEqual(50)
  })

  it('returns the correct number of downvotes when upvoteRatio is 0.75', () => {
    const result = calculateDownvotes(200, 0.75)
    expect(result).toEqual(50)
  })

  it('returns 100 when upvoteRatio is 0', () => {
    const result = calculateDownvotes(100, 0)
    expect(result).toEqual(100)
  })

  it('returns the correct number of downvotes when score is 0', () => {
    const result = calculateDownvotes(0, 0.5)
    expect(result).toEqual(0)
  })

  it('returns the correct number of downvotes when score is negative', () => {
    const result = calculateDownvotes(-100, 0.5)
    expect(result).toEqual(-50)
  })
})
