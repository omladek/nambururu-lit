import { describe, expect, it } from 'vitest'

import deescapeHtml from '../deescapeHtml'

describe('deescapeHtml', () => {
  it('deescapes characters', () => {
    expect(
      deescapeHtml(`Foo &amp; bar, &lt;a&gt;link&lt;/a&gt; &quot; &#039;`),
    ).eq(`Foo & bar, <a>link</a> " &#039;`)
  })

  it('returns empty string', () => {
    expect(deescapeHtml('')).eq('')
  })
})
