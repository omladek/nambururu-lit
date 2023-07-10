import { Preview } from '../types/reddit-api/ThreadsResult.type'

const getThumbnailDimensions = ({
  hasRedditThumbnail,
  preview,
  thumbnail_height,
  thumbnail_width,
}: {
  hasRedditThumbnail: boolean
  preview: Preview | undefined
  thumbnail_height: number
  thumbnail_width: number
}): { thumbnailHeight: number; thumbnailWidth: number } => {
  const thumbnailHeight = hasRedditThumbnail
    ? preview?.images[0].source.height || 0
    : thumbnail_height
  const thumbnailWidth = hasRedditThumbnail
    ? preview?.images[0].source.width || 0
    : thumbnail_width

  return { thumbnailHeight, thumbnailWidth }
}

export default getThumbnailDimensions
