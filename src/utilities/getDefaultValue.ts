export default function getDefaultValue(key: string): string {
  return localStorage.getItem(key) || ''
}
