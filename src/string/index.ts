/**
 * Converts a string to a URL-friendly slug
 * @param text - The text to slugify
 * @returns The slugified string
 * @example
 * slugify('Hello World!') // returns 'hello-world'
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Capitalizes the first letter of a string
 * @param text - The text to capitalize
 * @returns The capitalized string
 * @example
 * capitalize('hello world') // returns 'Hello world'
 */
export function capitalize(text: string): string {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/**
 * Truncates a string to a specified length and adds an ellipsis
 * @param text - The text to truncate
 * @param maxLength - The maximum length (default: 100)
 * @param suffix - The suffix to add (default: '...')
 * @returns The truncated string
 * @example
 * truncate('Lorem ipsum dolor sit amet', 10) // returns 'Lorem ipsu...'
 */
export function truncate(text: string, maxLength: number = 100, suffix: string = '...'): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * Generates a random string of specified length
 * @param length - The length of the random string (default: 10)
 * @param charset - The character set to use (default: alphanumeric)
 * @returns A random string
 * @example
 * randomString(8) // returns 'aB3dE7fG'
 */
export function randomString(
  length: number = 10,
  charset: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
}
