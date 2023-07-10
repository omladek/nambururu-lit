import parseStorage from './parseStorage'

export default function isInStorage(key: string, value: string): boolean {
  const currentValue = parseStorage(key)

  return Boolean(
    currentValue.find((item) => item.toLowerCase() === value.toLowerCase()),
  )
}
