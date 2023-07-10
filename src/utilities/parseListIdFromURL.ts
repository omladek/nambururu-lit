export default function parseListIdFromURL(input: string): string | null {
  const pattern = /list=([^&]+)/
  const match = input.match(pattern)

  if (match && match.length > 1) {
    return match[1]
  }
  return null
}
