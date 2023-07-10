import getUniqueStrings from './getUniqueStrings'

const getSortedList = (arr: string[]): string[] =>
  getUniqueStrings(
    [...arr]
      .sort((a, b) => a.localeCompare(b, 'en-US', { sensitivity: 'base' }))
      .filter(Boolean)
      .filter((value) => value !== ''),
  )

export default getSortedList
