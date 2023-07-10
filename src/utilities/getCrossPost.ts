import { ChildData } from '../types/reddit-api/ThreadsResult.type'

const getCrossPost = (post: ChildData): ChildData => {
  const { crosspost_parent, crosspost_parent_list } = post

  const crossPost =
    crosspost_parent && !!crosspost_parent_list?.length
      ? crosspost_parent_list.find((item) => item.name === crosspost_parent)
      : null

  if (crossPost) {
    return getCrossPost(crossPost)
  }

  return post
}

export default getCrossPost
