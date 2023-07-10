import { describe, it, expect } from 'vitest'
import getSanitizedString from '../getSanitizedString'

describe('getSanitizedString', () => {
  it('should remove unsafe, escaped, and unescaped characters', () => {
    const input = 'my_@-s%20ani$tized_string!%3C%2F%3E%2C*-%20'
    const expected = 'my_-s20anitized_string3C2F3E2C-20'
    const result = getSanitizedString(input)

    expect(result).toBe(expected)
  })
})
