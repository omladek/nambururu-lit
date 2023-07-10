import { expect, describe, it } from 'vitest'
import { RedditHostedImage } from '../../types/reddit-api/ThreadsResult.type'
import getImageByContainerWidth from '../getImageByContainerWidth'

describe('getImageByContainerWidth', () => {
  const images: RedditHostedImage[] = [
    { u: '1.jpg', x: 100, y: 100 },
    { u: '2.jpg', x: 200, y: 200 },
    { u: '3.jpg', x: 300, y: 300 },
  ]

  it('returns the image with the closest width match', () => {
    const result = getImageByContainerWidth(images, 1, 150)
    expect(result).toEqual({ u: '1.jpg', x: 100, y: 100 })
  })

  it('returns the image with the closest width match when containerWidth is larger', () => {
    const result = getImageByContainerWidth(images, 1, 250)
    expect(result).toEqual({ u: '2.jpg', x: 200, y: 200 })
  })

  it('returns the image with the closest width match when containerWidth is smaller', () => {
    const result = getImageByContainerWidth(images, 1, 50)
    expect(result).toEqual({ u: '1.jpg', x: 100, y: 100 })
  })

  it('returns the image with the closest width match when dpr is greater than 1', () => {
    const result = getImageByContainerWidth(images, 2, 150)
    expect(result).toEqual({ u: '3.jpg', x: 300, y: 300 })
  })

  it('returns the first image when there is only one image', () => {
    const singleImage: RedditHostedImage[] = [
      { u: 'image.jpg', x: 100, y: 100 },
    ]
    const result = getImageByContainerWidth(singleImage, 1, 150)
    expect(result).toEqual({ u: 'image.jpg', x: 100, y: 100 })
  })

  it('returns undefined when the image array is empty', () => {
    const result = getImageByContainerWidth([], 1, 150)
    expect(result).toBeUndefined()
  })
})
