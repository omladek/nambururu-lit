export default function parseStorage(key: string): string[] {
  return (localStorage.getItem(key) || '').split(',').filter(Boolean)
}
