import Storage from '../constants/storage'
import parseStorage from './parseStorage'

export default function removeFromStorage(key: Storage, value: string): void {
  const currentValue = parseStorage(key)
  const nextValue = currentValue
    .filter((item) => item.toLowerCase() !== value.toLowerCase())
    .join(',')

  localStorage.setItem(key, nextValue)
}
