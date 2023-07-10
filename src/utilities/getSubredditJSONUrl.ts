import basicSubreddits, { BasicSubreddit } from '../constants/basicSubreddits'
import sortOptions, { SortOption } from '../constants/sortOptions'
import getSubredditsURLValue from './getSubredditsURLValue'
import parseStorage from './parseStorage'

interface Props {
  subreddit: string | BasicSubreddit
  after?: string | null | undefined
  sort?: SortOption
}

const getSubredditJSONUrl = ({
  after = '',
  sort = sortOptions[0],
  subreddit,
}: Props): URL => {
  let subredditBase = subreddit
  let sortBase: string = sort

  const lists = parseStorage('lists')

  if (lists.includes(subreddit)) {
    subredditBase = getSubredditsURLValue(subreddit)
  }

  subredditBase = basicSubreddits.includes(subredditBase as BasicSubreddit)
    ? subredditBase
    : `r/${subredditBase}`

  if (!subredditBase.startsWith('r/')) {
    sortBase = ''
  } else if (sortBase === '') {
    sortBase = ``
  } else {
    sortBase = `/${sort}`
  }

  const url = new URL(
    `https://www.reddit.com/${subredditBase}${sortBase}/.json`,
  )

  url.searchParams.append('json_raw', '1')
  url.searchParams.append('limit', '100')

  if (after) {
    url.searchParams.append('after', after)
  }

  return url
}

export default getSubredditJSONUrl
