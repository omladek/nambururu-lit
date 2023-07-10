const getDateFromUnixTime = (unixTime: number): string =>
  new Date(unixTime * 1000).toLocaleString()

export default getDateFromUnixTime
