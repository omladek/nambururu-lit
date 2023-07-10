import { describe, expect, it } from 'vitest'

import getUniqueStrings from '../getUniqueStrings'

describe('getUniqueStrings', () => {
  it('getUniqueStrings', () => {
    expect(getUniqueStrings(['Apple', 'apple'])).toStrictEqual(['Apple'])
  })
})
