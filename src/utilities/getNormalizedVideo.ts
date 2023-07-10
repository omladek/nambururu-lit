import {
  ChildData,
  NormalizedVideo,
} from '../types/reddit-api/ThreadsResult.type'
import deescapeHtml from './deescapeHtml'

const getNormalizedVideo = (post: ChildData): NormalizedVideo | null => {
  const { domain, preview, thumbnail, thumbnail_height, thumbnail_width, url } =
    post

  const isNormalizedVideo = domain === 'i.imgur.com' && url.endsWith('.gifv')

  if (!isNormalizedVideo) {
    return null
  }

  let poster = thumbnail

  if (thumbnail === 'nsfw') {
    poster = preview?.images[0]?.source?.url || thumbnail
  }

  poster = (poster || '').startsWith('http') ? deescapeHtml(poster) : ''

  return {
    type: 'normalizedVideo',
    hasAudio: false,
    height: thumbnail_height || 9,
    poster,
    url: url.replace('.gifv', '.mp4'),
    width: thumbnail_width || 16,
  }
}

export default getNormalizedVideo
