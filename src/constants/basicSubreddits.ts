const basicSubreddits = ['best', 'top', 'hot', 'new', 'controversial'] as const

export type BasicSubreddit = (typeof basicSubreddits)[number]

export default basicSubreddits
