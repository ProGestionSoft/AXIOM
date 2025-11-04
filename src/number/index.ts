/**
 * Formats a number with thousands separators and decimal places
 * @param value - The number to format
 * @param decimals - Number of decimal places (default: 2)
 * @param locale - The locale to use for formatting (default: 'en-US')
 * @returns The formatted number string
 * @example
 * formatNumber(1234567.89) // returns '1,234,567.89'
 * formatNumber(1234.5, 0) // returns '1,235'
 */
export function formatNumber(
  value: number,
  decimals: number = 2,
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Clamps a number between a minimum and maximum value
 * @param value - The number to clamp
 * @param min - The minimum value
 * @param max - The maximum value
 * @returns The clamped value
 * @example
 * clamp(10, 0, 5) // returns 5
 * clamp(-5, 0, 10) // returns 0
 * clamp(7, 0, 10) // returns 7
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Rounds a number to a specified number of decimal places
 * @param value - The number to round
 * @param decimals - Number of decimal places (default: 0)
 * @returns The rounded number
 * @example
 * roundTo(3.14159, 2) // returns 3.14
 * roundTo(2.5) // returns 3
 */
export function roundTo(value: number, decimals: number = 0): number {
  const multiplier = Math.pow(10, decimals);
  return Math.round(value * multiplier) / multiplier;
}

/**
 * Calculates the percentage of a value relative to a total
 * @param value - The value to calculate percentage for
 * @param total - The total value
 * @param decimals - Number of decimal places (default: 2)
 * @returns The percentage value
 * @example
 * percent(25, 100) // returns 25
 * percent(1, 3, 2) // returns 33.33
 */
export function percent(value: number, total: number, decimals: number = 2): number {
  if (total === 0) return 0;
  return roundTo((value / total) * 100, decimals);
}
