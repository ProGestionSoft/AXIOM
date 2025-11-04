import { describe, it, expect } from 'vitest';
import { formatNumber, clamp, roundTo, percent } from '../src/number/index.js';

describe('Number utilities', () => {
  describe('formatNumber', () => {
    it('should format with thousands separators', () => {
      expect(formatNumber(1234567.89)).toBe('1,234,567.89');
    });

    it('should respect decimal places', () => {
      expect(formatNumber(1234.5, 0)).toBe('1,235');
      expect(formatNumber(1234.567, 3)).toBe('1,234.567');
    });

    it('should use default 2 decimals', () => {
      expect(formatNumber(1234)).toBe('1,234.00');
    });

    it('should handle negative numbers', () => {
      expect(formatNumber(-1234.56)).toBe('-1,234.56');
    });
  });

  describe('clamp', () => {
    it('should clamp value above max to max', () => {
      expect(clamp(10, 0, 5)).toBe(5);
    });

    it('should clamp value below min to min', () => {
      expect(clamp(-5, 0, 10)).toBe(0);
    });

    it('should return value when within range', () => {
      expect(clamp(7, 0, 10)).toBe(7);
    });

    it('should handle negative ranges', () => {
      expect(clamp(-15, -10, -5)).toBe(-10);
    });
  });

  describe('roundTo', () => {
    it('should round to specified decimals', () => {
      expect(roundTo(3.14159, 2)).toBe(3.14);
      expect(roundTo(3.14159, 3)).toBe(3.142);
    });

    it('should round to integer by default', () => {
      expect(roundTo(2.5)).toBe(3);
      expect(roundTo(2.4)).toBe(2);
    });

    it('should handle negative numbers', () => {
      expect(roundTo(-3.14159, 2)).toBe(-3.14);
    });
  });

  describe('percent', () => {
    it('should calculate percentage', () => {
      expect(percent(25, 100)).toBe(25);
      expect(percent(1, 4)).toBe(25);
    });

    it('should respect decimal places', () => {
      expect(percent(1, 3, 2)).toBe(33.33);
      expect(percent(1, 3, 4)).toBe(33.3333);
    });

    it('should handle zero total', () => {
      expect(percent(10, 0)).toBe(0);
    });

    it('should handle zero value', () => {
      expect(percent(0, 100)).toBe(0);
    });

    it('should handle percentages over 100', () => {
      expect(percent(150, 100)).toBe(150);
    });
  });
});
