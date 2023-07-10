import { describe, test, expect } from 'vitest'
import formatNumber from '../formatNumber'

describe('formatNumber', () => {
  test('should format positive number greater than or equal to 1,000,000 as "Xm"', () => {
    const number = 1500000
    const result = formatNumber(number)
    expect(result).toBe('2m')
  })

  test('should format negative number less than or equal to -1,000,000 as "Xm"', () => {
    const number = -2700000
    const result = formatNumber(number)
    expect(result).toBe('-3m')
  })

  test('should format positive number greater than or equal to 1,000 as "Xk"', () => {
    const number = 2600
    const result = formatNumber(number)
    expect(result).toBe('3k')
  })

  test('should format negative number less than or equal to -1,000 as "Xk"', () => {
    const number = -3700
    const result = formatNumber(number)
    expect(result).toBe('-4k')
  })

  test('should return the number as is if it is between -999 and 999', () => {
    const number = 500
    const result = formatNumber(number)
    expect(result).toBe(500)
  })

  test('should return the negative number as is if it is between -999 and 999', () => {
    const number = -500
    const result = formatNumber(number)
    expect(result).toBe(-500)
  })
})
