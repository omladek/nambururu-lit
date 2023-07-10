import {
  ChildData,
  NormalizedVideo,
} from '../types/reddit-api/ThreadsResult.type'
import deescapeHtml from './deescapeHtml'

export default (post: ChildData): NormalizedVideo | null => {
  const { is_video, media, thumbnail } = post

  const hasYoutubeIframe = media && media?.type === 'youtube.com'

  const hasEmbeddedVideo =
    is_video && media && media.reddit_video && !hasYoutubeIframe

  if (!hasEmbeddedVideo) {
    return null
  }

  let poster = thumbnail

  if (thumbnail === 'nsfw') {
    const nsfwPoster = post.preview?.images[0]?.source?.url

    poster = nsfwPoster || thumbnail
  }

  poster = (poster || '').startsWith('http') ? deescapeHtml(poster) : ''

  return {
    type: 'normalizedVideo',
    hasAudio: media.reddit_video.has_audio,
    height: media.reddit_video.height,
    poster,
    url: media.reddit_video.fallback_url,
    width: media.reddit_video.width,
  }
}
