import { RedditHostedImage } from '../types/reddit-api/ThreadsResult.type'

const getImageByContainerWidth = (
  images: RedditHostedImage[],
  dpr: number,
  containerWidth: number,
): RedditHostedImage => {
  const size = Math.round(containerWidth * dpr)
  let closestX = Number.MAX_SAFE_INTEGER
  let bestMatch: RedditHostedImage | null = null
  const imagesTotal = images.length

  for (let index = 0; index < imagesTotal; index += 1) {
    const image = images[index]
    const diff = Math.abs(image.x - size)

    if (diff < closestX) {
      closestX = diff
      bestMatch = image
    }
  }

  return bestMatch || images[0]
}

export default getImageByContainerWidth
