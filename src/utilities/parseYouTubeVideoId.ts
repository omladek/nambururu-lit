export default function parseYouTubeVideoId(
  embeddedString: string,
  url: string,
): string | null {
  const matchEmbed = embeddedString.match(/youtube\.com\/embed\/([\w-]{11})/i)

  if (matchEmbed && matchEmbed.length >= 2) {
    return matchEmbed[1]
  }

  const matchUrl = url.match(/[?&]v=([^?&]+)/)

  if (matchUrl && matchUrl[1]) {
    return matchUrl[1]
  }

  return null
}
