import { describe, test, expect } from 'vitest'

import updateAnchorTags from '../updateAnchorTags'

describe('updateAnchorTags', () => {
  test('should add target="_blank" to anchor tags without target attribute and replace others', () => {
    const htmlString =
      '<p><a href="https://example.com">Link 1</a><a href="https://example.com" target="_self">Link 2</a></p>'
    const updatedHtml = updateAnchorTags(htmlString)
    const expectedHtml =
      '<p><a href="https://example.com" target="_blank" rel="noopener noreferrer">Link 1</a><a href="https://example.com" target="_blank" rel="noopener noreferrer">Link 2</a></p>'
    expect(updatedHtml).toBe(expectedHtml)
  })
})
