const sortOptions = ['best', 'hot', 'new', 'top'] as const

export type SortOption = (typeof sortOptions)[number]

export default sortOptions
