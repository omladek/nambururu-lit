import settings from '../constants/settings'
import {
  ChildData,
  NormalizedSingleImage,
} from '../types/reddit-api/ThreadsResult.type'
import deescapeHtml from './deescapeHtml'
import getImageByContainerWidth from './getImageByContainerWidth'

export default (post: ChildData): NormalizedSingleImage | null => {
  const {
    is_gallery,
    is_video,
    media,
    preview,
    thumbnail,
    thumbnail_height,
    thumbnail_width,
  } = post

  const hasThumbnail = !(
    thumbnail !== null &&
    ['nsfw', 'spoiler', 'default', 'self', 'image'].includes(thumbnail)
  )

  const hasYoutubeIframe = media && media?.type === 'youtube.com'

  const hasSingleImage =
    hasThumbnail &&
    !is_video &&
    !is_gallery &&
    !hasYoutubeIframe &&
    !!preview?.images[0].source

  if (!hasSingleImage) {
    return null
  }

  const normalizedResolutions =
    preview?.images[0].resolutions.map((image) => ({
      u: image.url,
      x: image.width,
      y: image.height,
    })) || []

  const dpr1 = getImageByContainerWidth(
    normalizedResolutions,
    settings.IMAGE_CONTAINER_WIDTH,
    1,
  ).u

  const thumbnailDescaped = dpr1 ? deescapeHtml(dpr1) : deescapeHtml(thumbnail)

  const dpr2 = getImageByContainerWidth(
    normalizedResolutions,
    settings.IMAGE_CONTAINER_WIDTH,
    2,
  ).u

  const retina = dpr2 ? deescapeHtml(dpr2) : ''

  return {
    type: 'singleImage',
    fullSize: deescapeHtml(preview?.images[0].source.url),
    height: Math.max(
      thumbnail_height || 0,
      preview?.images[0].source.height || 0,
    ),
    retina,
    thumbnail: thumbnailDescaped,
    width: Math.max(thumbnail_width || 0, preview?.images[0].source.width || 0),
  }
}
