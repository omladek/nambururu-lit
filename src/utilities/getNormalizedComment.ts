import {
  NormalizedComment,
  ChildData,
} from '../types/reddit-api/CommentsResult.type'
import deescapeHtml from './deescapeHtml'
import formatNumber from './formatNumber'
import updateAnchorTags from './updateAnchorTags'

const getNormalizedComment = ({
  body_html,
  id,
  ups,
  voteResult,
}: ChildData & {
  voteResult: string
}): NormalizedComment => {
  return {
    id,
    voteResult,
    upVotes: formatNumber(ups),
    text: updateAnchorTags(deescapeHtml(body_html)),
  }
}

export default getNormalizedComment
