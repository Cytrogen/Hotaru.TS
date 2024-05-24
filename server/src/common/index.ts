export const REQUEST_USER_KEY = 'user'

/**
 * Generate a random number with a specified number of digits.
 *
 * @param digits Default is 6
 */
export const generateRandomNumber = (digits: number = 6): string => {
  let result = ''
  for (let i = 0; i < digits; i++) {
    const randomDigit = Math.floor(Math.random() * 10)
    result += randomDigit
  }
  return result
}
