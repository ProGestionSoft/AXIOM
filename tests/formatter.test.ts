import { describe, it, expect } from 'vitest';
import { formatTimestamp } from '../src/formatter/index.js';

describe('Formatter utilities', () => {
  describe('formatTimestamp', () => {
    const testTimestamp = 1700000000000; // 2023-11-14T22:13:20.000Z

    it('should return timestamp when format is "timestamp"', () => {
      expect(formatTimestamp(testTimestamp, 'timestamp')).toBe(testTimestamp);
    });

    it('should return timestamp as default format', () => {
      expect(formatTimestamp(testTimestamp)).toBe(testTimestamp);
    });

    it('should format as full date', () => {
      const result = formatTimestamp(testTimestamp, 'full', 'fr-FR');
      expect(result).toContain('novembre');
      expect(result).toContain('2023');
    });

    it('should format as compact date', () => {
      const result = formatTimestamp(testTimestamp, 'compact', 'fr-FR');
      expect(typeof result).toBe('string');
      expect(result).toContain('2023');
    });

    it('should format as long date', () => {
      const result = formatTimestamp(testTimestamp, 'long', 'fr-FR');
      expect(result).toContain('novembre');
      expect(result).toContain('2023');
    });

    it('should format as medium date', () => {
      const result = formatTimestamp(testTimestamp, 'medium', 'fr-FR');
      expect(typeof result).toBe('string');
      expect(result).toContain('2023');
    });

    it('should format as short date', () => {
      const result = formatTimestamp(testTimestamp, 'short', 'fr-FR');
      expect(result).toMatch(/\d{2}\/\d{2}\/\d{4}/);
    });

    it('should format as datetime', () => {
      const result = formatTimestamp(testTimestamp, 'datetime', 'fr-FR');
      expect(typeof result).toBe('string');
      expect(result).toContain('2023');
      expect(result).toMatch(/\d{2}:\d{2}:\d{2}/);
    });

    it('should format as time only', () => {
      const result = formatTimestamp(testTimestamp, 'time', 'fr-FR');
      expect(result).toMatch(/\d{2}:\d{2}:\d{2}/);
    });

    it('should format as ISO string', () => {
      const result = formatTimestamp(testTimestamp, 'iso');
      expect(result).toBe('2023-11-14T22:13:20.000Z');
    });

    it('should format as relative time for past dates', () => {
      const pastTimestamp = Date.now() - 60000; // 1 minute ago
      const result = formatTimestamp(pastTimestamp, 'relative', 'fr-FR');
      expect(typeof result).toBe('string');
    });

    it('should format as relative time for future dates', () => {
      const futureTimestamp = Date.now() + 3600000; // 1 hour in future
      const result = formatTimestamp(futureTimestamp, 'relative', 'fr-FR');
      expect(typeof result).toBe('string');
    });

    it('should handle invalid timestamp', () => {
      const result = formatTimestamp(NaN, 'full');
      expect(result).toBe(NaN);
    });

    it('should work with different locales', () => {
      const resultFr = formatTimestamp(testTimestamp, 'long', 'fr-FR');
      const resultEn = formatTimestamp(testTimestamp, 'long', 'en-US');
      expect(resultFr).toContain('novembre');
      expect(resultEn).toContain('November');
    });

    it('should handle errors gracefully', () => {
      const result = formatTimestamp(testTimestamp, 'full', 'invalid-locale');
      // Should still return a valid string or timestamp
      expect(typeof result === 'string' || typeof result === 'number').toBe(true);
    });
  });
});
