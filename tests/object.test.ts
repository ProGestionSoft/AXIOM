import { describe, it, expect } from 'vitest';
import { deepClone, merge, omit, pick } from '../src/object/index.js';

describe('Object utilities', () => {
  describe('deepClone', () => {
    it('should clone primitive values', () => {
      expect(deepClone(42)).toBe(42);
      expect(deepClone('hello')).toBe('hello');
      expect(deepClone(null)).toBe(null);
    });

    it('should clone simple objects', () => {
      const obj = { a: 1, b: 2 };
      const cloned = deepClone(obj);
      expect(cloned).toEqual(obj);
      expect(cloned).not.toBe(obj);
    });

    it('should clone nested objects', () => {
      const obj = { a: 1, b: { c: 2, d: { e: 3 } } };
      const cloned = deepClone(obj);
      expect(cloned).toEqual(obj);
      expect(cloned.b).not.toBe(obj.b);
      expect(cloned.b.d).not.toBe(obj.b.d);
    });

    it('should clone arrays', () => {
      const arr = [1, [2, 3], { a: 4 }];
      const cloned = deepClone(arr);
      expect(cloned).toEqual(arr);
      expect(cloned).not.toBe(arr);
      expect(cloned[1]).not.toBe(arr[1]);
    });

    it('should clone Date objects', () => {
      const date = new Date('2024-01-15');
      const cloned = deepClone(date);
      expect(cloned.getTime()).toBe(date.getTime());
      expect(cloned).not.toBe(date);
    });
  });

  describe('merge', () => {
    it('should merge simple objects', () => {
      const obj1 = { a: 1, b: 2 };
      const obj2 = { c: 3 };
      expect(merge(obj1, obj2)).toEqual({ a: 1, b: 2, c: 3 });
    });

    it('should merge nested objects', () => {
      const obj1 = { a: { x: 1 } };
      const obj2 = { a: { y: 2 } };
      expect(merge(obj1, obj2)).toEqual({ a: { x: 1, y: 2 } });
    });

    it('should override primitive values', () => {
      const obj1 = { a: 1, b: 2 };
      const obj2 = { b: 3, c: 4 };
      expect(merge(obj1, obj2)).toEqual({ a: 1, b: 3, c: 4 });
    });

    it('should handle multiple sources', () => {
      const obj1 = { a: 1 };
      const obj2 = { b: 2 };
      const obj3 = { c: 3 };
      expect(merge(obj1, obj2, obj3)).toEqual({ a: 1, b: 2, c: 3 });
    });

    it('should not modify original objects', () => {
      const obj1 = { a: 1 };
      const obj2 = { b: 2 };
      merge(obj1, obj2);
      expect(obj1).toEqual({ a: 1 });
      expect(obj2).toEqual({ b: 2 });
    });
  });

  describe('omit', () => {
    it('should omit specified keys', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(omit(obj, ['b', 'c'])).toEqual({ a: 1 });
    });

    it('should handle empty keys array', () => {
      const obj = { a: 1, b: 2 };
      expect(omit(obj, [])).toEqual({ a: 1, b: 2 });
    });

    it('should handle non-existent keys', () => {
      const obj = { a: 1, b: 2 };
      expect(omit(obj, ['c' as keyof typeof obj])).toEqual({ a: 1, b: 2 });
    });

    it('should not modify original object', () => {
      const obj = { a: 1, b: 2 };
      omit(obj, ['b']);
      expect(obj).toEqual({ a: 1, b: 2 });
    });
  });

  describe('pick', () => {
    it('should pick specified keys', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(pick(obj, ['a', 'c'])).toEqual({ a: 1, c: 3 });
    });

    it('should handle empty keys array', () => {
      const obj = { a: 1, b: 2 };
      expect(pick(obj, [])).toEqual({});
    });

    it('should handle non-existent keys', () => {
      const obj = { a: 1, b: 2 };
      expect(pick(obj, ['c' as keyof typeof obj])).toEqual({});
    });

    it('should not modify original object', () => {
      const obj = { a: 1, b: 2 };
      pick(obj, ['a']);
      expect(obj).toEqual({ a: 1, b: 2 });
    });
  });
});
