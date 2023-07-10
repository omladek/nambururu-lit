import {
  ChildData,
  NormalizedExternalLink,
} from '../types/reddit-api/ThreadsResult.type'

export default (post: ChildData): NormalizedExternalLink | null => {
  const { domain, url } = post

  if (
    !url.startsWith('https://www.reddit.com/') &&
    !url.startsWith('r/') &&
    !domain.includes('i.redd.it')
  ) {
    return {
      type: 'externalLink',
      url,
      image: `https://logo.clearbit.com/${domain.replace(/^m./, '')}`,
    }
  }
  return null
}
