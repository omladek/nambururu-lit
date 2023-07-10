import {
  ChildData,
  NormalizedYoutube,
} from '../types/reddit-api/ThreadsResult.type'
import parseYouTubeVideoId from './parseYouTubeVideoId'

export default (post: ChildData): NormalizedYoutube | null => {
  const { media } = post

  const hasYoutubeIframe = media && media?.type === 'youtube.com'

  if (!hasYoutubeIframe) {
    return null
  }

  const id = parseYouTubeVideoId(media.oembed.html, media.oembed.url)

  if (!id) {
    return null
  }

  return {
    type: 'youtube',
    width: media?.oembed?.width || 16,
    height: media?.oembed?.height || 9,
    id,
    thumbnail: media.oembed.thumbnail_url,
  }
}
