const getUniqueStrings = (inputArray: string[]): string[] => {
  const uniqueStrings: string[] = []
  const lowerCaseSet: Set<string> = new Set()

  // Use array iteration method `forEach` to iterate through each string in the input array
  inputArray.forEach((str) => {
    const lowerCaseString = str.toLowerCase()

    // Check if the lowercase version of the string is already in the lowerCaseSet
    if (!lowerCaseSet.has(lowerCaseString)) {
      // Add the original string to the uniqueStrings array
      uniqueStrings.push(str)

      // Add the lowercase string to the lowerCaseSet
      lowerCaseSet.add(lowerCaseString)
    }
  })

  return uniqueStrings
}

export default getUniqueStrings
