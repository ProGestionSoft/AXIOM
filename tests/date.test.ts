import { describe, it, expect } from 'vitest';
import { formatDate, timeAgo, isValidDate } from '../src/date/index.js';

describe('Date utilities', () => {
  describe('formatDate', () => {
    it('should format date with default options', () => {
      const date = new Date('2024-01-15');
      const formatted = formatDate(date);
      expect(formatted).toMatch(/\d+\/\d+\/\d+/);
    });

    it('should format with custom options', () => {
      const date = new Date('2024-01-15');
      const formatted = formatDate(date, { year: 'numeric', month: 'long' });
      expect(formatted).toContain('January');
      expect(formatted).toContain('2024');
    });

    it('should handle string dates', () => {
      const formatted = formatDate('2024-01-15');
      expect(formatted).toMatch(/\d+\/\d+\/\d+/);
    });

    it('should throw on invalid date', () => {
      expect(() => formatDate('invalid')).toThrow('Invalid date provided');
    });
  });

  describe('timeAgo', () => {
    it('should return "just now" for recent times', () => {
      const now = new Date();
      expect(timeAgo(now)).toBe('just now');
    });

    it('should handle seconds ago', () => {
      const date = new Date(Date.now() - 30000);
      expect(timeAgo(date)).toBe('30 seconds ago');
    });

    it('should handle minutes ago', () => {
      const date = new Date(Date.now() - 120000);
      expect(timeAgo(date)).toBe('2 minutes ago');
    });

    it('should handle hours ago', () => {
      const date = new Date(Date.now() - 7200000);
      expect(timeAgo(date)).toBe('2 hours ago');
    });

    it('should handle days ago', () => {
      const date = new Date(Date.now() - 86400000 * 3);
      expect(timeAgo(date)).toBe('3 days ago');
    });

    it('should handle future dates', () => {
      const date = new Date(Date.now() + 3600000);
      expect(timeAgo(date)).toBe('in 1 hour');
    });

    it('should handle singular correctly', () => {
      const date = new Date(Date.now() - 60000);
      expect(timeAgo(date)).toBe('1 minute ago');
    });

    it('should throw on invalid date', () => {
      expect(() => timeAgo('invalid')).toThrow('Invalid date provided');
    });
  });

  describe('isValidDate', () => {
    it('should return true for valid Date object', () => {
      expect(isValidDate(new Date())).toBe(true);
    });

    it('should return true for valid date string', () => {
      expect(isValidDate('2024-01-15')).toBe(true);
    });

    it('should return true for timestamp', () => {
      expect(isValidDate(Date.now())).toBe(true);
    });

    it('should return false for invalid date', () => {
      expect(isValidDate(new Date('invalid'))).toBe(false);
      expect(isValidDate('not a date')).toBe(false);
    });

    it('should return false for NaN', () => {
      expect(isValidDate(NaN)).toBe(false);
    });
  });
});
