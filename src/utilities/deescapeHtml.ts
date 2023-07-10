const deescapeHtml = (unsafeHTML = ''): string => {
  const entityMap: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&#x2F;': '/',
  }

  if (!unsafeHTML) {
    return ''
  }

  return unsafeHTML.replace(/&(amp|lt|gt|quot|#39|#x2F);/g, (match) => {
    return entityMap[match]
  })
}

export default deescapeHtml
