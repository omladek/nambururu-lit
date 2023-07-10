import basicSubreddits from '../constants/basicSubreddits'
import parseStorage from './parseStorage'

export default function getSubredditsURLValue(key: string): string {
  const values = parseStorage(key)

  if (!values.length) {
    return basicSubreddits[0]
  }

  return values.join('+')
}
