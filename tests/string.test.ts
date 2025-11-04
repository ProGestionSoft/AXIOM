import { describe, it, expect } from 'vitest';
import { slugify, capitalize, truncate, randomString } from '../src/string/index.js';

describe('String utilities', () => {
  describe('slugify', () => {
    it('should convert text to lowercase slug', () => {
      expect(slugify('Hello World')).toBe('hello-world');
    });

    it('should remove special characters', () => {
      expect(slugify('Hello @World!')).toBe('hello-world');
    });

    it('should handle accented characters', () => {
      expect(slugify('Café Français')).toBe('cafe-francais');
    });

    it('should trim hyphens from start and end', () => {
      expect(slugify('  Hello World  ')).toBe('hello-world');
    });

    it('should replace multiple spaces with single hyphen', () => {
      expect(slugify('Hello    World')).toBe('hello-world');
    });
  });

  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
    });

    it('should lowercase rest of string', () => {
      expect(capitalize('hELLO')).toBe('Hello');
    });

    it('should handle empty string', () => {
      expect(capitalize('')).toBe('');
    });

    it('should handle single character', () => {
      expect(capitalize('a')).toBe('A');
    });
  });

  describe('truncate', () => {
    it('should truncate long text', () => {
      expect(truncate('Hello World', 8)).toBe('Hello...');
    });

    it('should not truncate short text', () => {
      expect(truncate('Hello', 10)).toBe('Hello');
    });

    it('should use custom suffix', () => {
      expect(truncate('Hello World', 8, '…')).toBe('Hello W…');
    });

    it('should use default max length', () => {
      const longText = 'a'.repeat(150);
      expect(truncate(longText).length).toBeLessThanOrEqual(100);
    });
  });

  describe('randomString', () => {
    it('should generate string of specified length', () => {
      expect(randomString(10).length).toBe(10);
    });

    it('should generate different strings', () => {
      const str1 = randomString(20);
      const str2 = randomString(20);
      expect(str1).not.toBe(str2);
    });

    it('should use only characters from charset', () => {
      const charset = 'ABC123';
      const result = randomString(100, charset);
      for (const char of result) {
        expect(charset).toContain(char);
      }
    });

    it('should use default length', () => {
      expect(randomString().length).toBe(10);
    });
  });
});
