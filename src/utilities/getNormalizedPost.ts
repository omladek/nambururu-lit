import {
  ChildData,
  NormalizedPost,
} from '../types/reddit-api/ThreadsResult.type'
import calculateDownvotes from './calculateDownvotes'
import deescapeHtml from './deescapeHtml'
import formatNumber from './formatNumber'
import getDateFromUnixTime from './getDateFromUnixTime'
import getPostMedia from './getPostMedia'
import updateAnchorTags from './updateAnchorTags'

const getNormalizedPost = (post: ChildData): NormalizedPost => {
  const {
    created_utc,
    domain,
    id,
    num_comments,
    permalink,
    selftext_html,
    subreddit,
    title,
    ups,
    upvote_ratio,
    url_overridden_by_dest,
  } = post

  const media = getPostMedia(post)

  return {
    createdDate: getDateFromUnixTime(created_utc),
    domain,
    id,
    commentsTotalFormatted: formatNumber(num_comments),
    hasComments: num_comments > 0,
    permalink: `https://www.reddit.com${permalink}`,
    description: updateAnchorTags(deescapeHtml(selftext_html || '')),
    subreddit,
    title: deescapeHtml(title),
    upVotes: formatNumber(ups),
    downVotes: formatNumber(calculateDownvotes(ups, upvote_ratio)),
    media,
    externalLink:
      ['i.redd.it', 'reddit.com', 'v.redd.it'].includes(domain) ||
      domain.startsWith('self.')
        ? null
        : url_overridden_by_dest,
  }
}

export default getNormalizedPost
