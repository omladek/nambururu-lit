export default function formatNumber(number: number): string | number {
  if (number >= 1000000 || number <= -1000000) {
    return `${Math.round(number / 1000000)}m`
  }

  if (number >= 1000 || number <= -1000) {
    return `${Math.round(number / 1000)}k`
  }

  return number
}
