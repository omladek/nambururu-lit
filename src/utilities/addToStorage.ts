import Storage from '../constants/storage'
import parseStorage from './parseStorage'

export default function addToStorage(key: Storage, value: string): void {
  const currentValue = parseStorage(key)
  const nextValue = [...currentValue, value.trim()].join(',')

  localStorage.setItem(key, nextValue)
}
