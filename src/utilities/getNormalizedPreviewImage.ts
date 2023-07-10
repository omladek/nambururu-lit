import settings from '../constants/settings'
import {
  ChildData,
  NormalizedPreviewImage,
} from '../types/reddit-api/ThreadsResult.type'
import deescapeHtml from './deescapeHtml'
import getImageByContainerWidth from './getImageByContainerWidth'

export default function getNormalizedPreviewImage(
  post: ChildData,
): NormalizedPreviewImage | null {
  const { preview } = post

  if (preview && preview?.images?.length) {
    const images = [
      ...(preview.images[0].resolutions || []),
      preview.images[0].source,
    ].filter(Boolean)

    if (!images.length) {
      return null
    }
    const normalizedImages = images.map(({ height, url, width }) => ({
      u: url,
      x: width,
      y: height,
    }))

    const image = getImageByContainerWidth(
      normalizedImages,
      1,
      settings.IMAGE_CONTAINER_WIDTH,
    )

    return {
      type: 'previewImage',
      width: image.x,
      height: image.y,
      url: deescapeHtml(image.u),
    }
  }

  return null
}
