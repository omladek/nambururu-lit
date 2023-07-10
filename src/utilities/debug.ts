function debug(...optionalParams: unknown[]): void {
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.log(...optionalParams)
  }
}

export default debug
