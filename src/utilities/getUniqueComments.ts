import {
  CommentsResult,
  NormalizedComment,
} from '../types/reddit-api/CommentsResult.type'
import getNormalizedComment from './getNormalizedComment'

const getUniqueComments = (
  data: [
    { comments: CommentsResult[]; voteResult: string },
    { comments: CommentsResult[]; voteResult: string },
  ],
): NormalizedComment[] => {
  if (!data?.length) {
    return []
  }

  const unique: NormalizedComment[] = []

  data.forEach((commentsByVotes) => {
    const { comments, voteResult } = commentsByVotes
    const groups = comments.map((group) =>
      group.data.children.filter((comment) => !comment.data.stickied),
    )

    groups.forEach((group) => {
      let found = false

      group
        .filter((comment) => !!comment?.data?.body?.trim())
        .forEach((comment) => {
          if (found) {
            return
          }

          const commentId = comment.data.id

          if (unique.find((uniq) => uniq.id === commentId)) {
            return
          }

          found = true

          unique.push(getNormalizedComment({ ...comment.data, voteResult }))
        })
    })
  })

  return unique
}

export default getUniqueComments
