import {
  ChildData,
  NormalizedThumbnail,
} from '../types/reddit-api/ThreadsResult.type'
import deescapeHtml from './deescapeHtml'

export default (post: ChildData): NormalizedThumbnail | null => {
  const { domain, thumbnail, thumbnail_height, thumbnail_width, url } = post

  if (thumbnail === 'image' && domain === 'i.redd.it') {
    return {
      type: 'thumbnail',
      height: thumbnail_height || 90,
      width: thumbnail_width || 160,
      url: deescapeHtml(url),
    }
  }
  return null
}
