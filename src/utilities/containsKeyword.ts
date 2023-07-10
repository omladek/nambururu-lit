export default function containsKeyword(
  keywords: string[],
  sentence: string,
): boolean {
  const normalizedSentence = sentence.toLowerCase()

  return !!keywords.find((keyword) =>
    normalizedSentence.includes(keyword.toLowerCase()),
  )
}
