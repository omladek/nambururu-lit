import sortOptions, { SortOption } from '../constants/sortOptions'

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export default function parseSortFromURL(input: string): SortOption | null {
  const pattern = new RegExp(
    `sort=(${sortOptions.map((value) => escapeRegExp(value)).join('|')})`,
  )
  const match = input.match(pattern)

  if (match && match.length > 1) {
    return match[1] as SortOption
  }

  return null
}
