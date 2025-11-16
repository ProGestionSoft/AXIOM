/**
 * Format options for date formatting
 */
export type DateFormatType =
  | 'full'
  | 'compact'
  | 'long'
  | 'medium'
  | 'short'
  | 'datetime'
  | 'time'
  | 'iso'
  | 'relative'
  | 'timestamp';

/**
 * Formats a timestamp into various readable date formats
 * @param timestamp - The UNIX timestamp in milliseconds (e.g., 1756868642754)
 * @param format - The formatting style: full, compact, long, medium, short, datetime, time, iso, relative, or timestamp
 * @param locale - The locale to use for formatting (default: 'fr-FR')
 * @returns The formatted date string or the original timestamp if format is 'timestamp'
 * @example
 * formatTimestamp(1756868642754, 'full') // "vendredi 14 novembre 2025"
 * formatTimestamp(Date.now(), 'relative') // "il y a 2 jours"
 * formatTimestamp(1756868642754, 'iso') // "2025-11-14T22:14:03.001Z"
 */
export function formatTimestamp(
  timestamp: number,
  format: DateFormatType = 'timestamp',
  locale: string = 'fr-FR'
): string | number {
  if (format === 'timestamp') {
    return timestamp;
  }

  const date = new Date(timestamp);

  // Validate date
  if (isNaN(date.getTime())) {
    return timestamp;
  }

  try {
    switch (format) {
      case 'full': {
        // Example: "vendredi 14 novembre 2025"
        const options: Intl.DateTimeFormatOptions = {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        };
        return new Intl.DateTimeFormat(locale, options).format(date);
      }

      case 'compact': {
        // Example: "vend. 14 novembre 2025"
        const options: Intl.DateTimeFormatOptions = {
          weekday: 'short',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        };
        return new Intl.DateTimeFormat(locale, options).format(date);
      }

      case 'long': {
        // Example: "14 novembre 2025"
        const options: Intl.DateTimeFormatOptions = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        };
        return new Intl.DateTimeFormat(locale, options).format(date);
      }

      case 'medium': {
        // Example: "2 janv. 2025"
        const options: Intl.DateTimeFormatOptions = {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        };
        return new Intl.DateTimeFormat(locale, options).format(date);
      }

      case 'short': {
        // Example: "14/11/2025"
        const options: Intl.DateTimeFormatOptions = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        };
        return new Intl.DateTimeFormat(locale, options).format(date);
      }

      case 'datetime': {
        // Example: "2 janv. 2025 10:04:02"
        const datePart = new Intl.DateTimeFormat(locale, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }).format(date);

        const timePart = new Intl.DateTimeFormat(locale, {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(date);

        return `${datePart} ${timePart}`;
      }

      case 'time': {
        // Example: "22:14:03"
        const options: Intl.DateTimeFormatOptions = {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        };
        return new Intl.DateTimeFormat(locale, options).format(date);
      }

      case 'iso': {
        // Example: "2025-11-14T22:14:03.001Z"
        return date.toISOString();
      }

      case 'relative': {
        // Example: "il y a 2 jours"
        return formatRelativeTime(date, locale);
      }

      default:
        return timestamp;
    }
  } catch (error) {
    console.error(`Error formatting date with format ${format}:`, error);
    return timestamp;
  }
}

/**
 * Helper function to format relative time
 * @param date - The date to format
 * @param locale - The locale to use
 * @returns A human-readable relative time string
 */
function formatRelativeTime(date: Date, locale: string): string {
  const now = Date.now();
  const diffInSeconds = Math.floor((now - date.getTime()) / 1000);
  const isFuture = diffInSeconds < 0;
  const absSeconds = Math.abs(diffInSeconds);

  const intervals: Array<[Intl.RelativeTimeFormatUnit, number]> = [
    ['year', 31536000],
    ['month', 2592000],
    ['week', 604800],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
    ['second', 1],
  ];

  try {
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

    for (const [unit, secondsInUnit] of intervals) {
      const interval = Math.floor(absSeconds / secondsInUnit);
      if (interval >= 1) {
        return rtf.format(isFuture ? interval : -interval, unit);
      }
    }

    return rtf.format(0, 'second');
  } catch (error) {
    // Fallback for locales that don't support RelativeTimeFormat
    const intervals: Array<[string, number]> = [
      ['an', 31536000],
      ['mois', 2592000],
      ['semaine', 604800],
      ['jour', 86400],
      ['heure', 3600],
      ['minute', 60],
      ['seconde', 1],
    ];

    for (const [name, secondsInInterval] of intervals) {
      const interval = Math.floor(absSeconds / secondsInInterval);
      if (interval >= 1) {
        const plural = interval !== 1 && name !== 'mois' ? 's' : '';
        return isFuture
          ? `dans ${interval} ${name}${plural}`
          : `il y a ${interval} ${name}${plural}`;
      }
    }

    return "à l'instant";
  }
}
