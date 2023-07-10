import settings from '../constants/settings'
import {
  ChildData,
  NormalizedGallery,
  NormalizedGalleryImage,
} from '../types/reddit-api/ThreadsResult.type'
import deescapeHtml from './deescapeHtml'
import getImageByContainerWidth from './getImageByContainerWidth'

export default (post: ChildData): NormalizedGallery | null => {
  const { is_gallery, media_metadata } = post

  const hasGallery = (is_gallery && media_metadata) || media_metadata

  if (!hasGallery) {
    return null
  }

  const items: NormalizedGalleryImage[] = Object.keys(media_metadata).reduce(
    (acc: NormalizedGalleryImage[], curr) => {
      const image = media_metadata[curr]

      if (image.status !== 'valid') {
        return acc
      }

      if (!image?.s) {
        return acc
      }

      const fullSizeImage = image.s

      if (!image.p.length) {
        const src = deescapeHtml(fullSizeImage.u)

        acc.push({
          thumbnail: src,
          fullSize: src,
          retina: src,
          height: fullSizeImage.y,
          width: fullSizeImage.x,
        })

        return acc
      }

      const responsizeImageStandard = getImageByContainerWidth(
        image.p,
        1,
        settings.IMAGE_CONTAINER_WIDTH,
      )

      const responsizeImageRetina = getImageByContainerWidth(
        image.p,
        2,
        settings.IMAGE_CONTAINER_WIDTH,
      )

      acc.push({
        thumbnail: deescapeHtml(responsizeImageStandard.u),
        fullSize: deescapeHtml(fullSizeImage.u),
        retina: deescapeHtml(responsizeImageRetina.u),
        height: fullSizeImage.y,
        width: fullSizeImage.x,
      })

      return acc
    },
    [],
  )

  return {
    type: 'gallery',
    items,
  }
}
