function getSanitizedString(input: string): string {
  // eslint-disable-next-line no-useless-escape
  return input.replace(/[^a-zA-Z0-9_\-]+/g, '')
}

export default getSanitizedString
