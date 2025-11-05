/**
 * Formats a date according to a locale
 * @param date - The date to format
 * @param options - Intl.DateTimeFormatOptions for formatting
 * @param locale - The locale to use (default: 'en-US')
 * @returns The formatted date string
 * @example
 * formatDate(new Date('2024-01-15')) // returns '1/15/2024'
 * formatDate(new Date(), { dateStyle: 'full' }) // returns 'Monday, January 15, 2024'
 */
export function formatDate(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = { dateStyle: 'short' },
  locale: string = 'en-US'
): string {
  const dateObj = new Date(date);
  if (!isValidDate(dateObj)) {
    throw new Error('Invalid date provided');
  }
  return new Intl.DateTimeFormat(locale, options).format(dateObj);
}

/**
 * Returns a human-readable time difference from now
 * @param date - The date to compare
 * @returns A human-readable string like '5 minutes ago' or 'in 2 hours'
 * @example
 * timeAgo(new Date(Date.now() - 60000)) // returns '1 minute ago'
 * timeAgo(new Date(Date.now() + 3600000)) // returns 'in 1 hour'
 */
export function timeAgo(date: Date | string | number): string {
  const dateObj = new Date(date);
  if (!isValidDate(dateObj)) {
    throw new Error('Invalid date provided');
  }

  const seconds = Math.floor((Date.now() - dateObj.getTime()) / 1000);
  const isFuture = seconds < 0;
  const absSeconds = Math.abs(seconds);

  const intervals: [string, number][] = [
    ['year', 31536000],
    ['month', 2592000],
    ['week', 604800],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
    ['second', 1],
  ];

  for (const [name, secondsInInterval] of intervals) {
    const interval = Math.floor(absSeconds / secondsInInterval);
    if (interval >= 1) {
      const plural = interval !== 1 ? 's' : '';
      return isFuture ? `in ${interval} ${name}${plural}` : `${interval} ${name}${plural} ago`;
    }
  }

  return 'just now';
}

/**
 * Checks if a date is valid
 * @param date - The date to validate
 * @returns True if the date is valid, false otherwise
 * @example
 * isValidDate(new Date()) // returns true
 * isValidDate(new Date('invalid')) // returns false
 * isValidDate('2024-01-15') // returns true
 */
export function isValidDate(date: Date | string | number): boolean {
  const dateObj = date instanceof Date ? date : new Date(date);
  return !isNaN(dateObj.getTime());
}
