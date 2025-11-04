import { describe, it, expect } from 'vitest';
import { unique, chunk, flatten, groupBy } from '../src/array/index.js';

describe('Array utilities', () => {
  describe('unique', () => {
    it('should remove duplicate numbers', () => {
      expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
    });

    it('should remove duplicate strings', () => {
      expect(unique(['a', 'b', 'a', 'c'])).toEqual(['a', 'b', 'c']);
    });

    it('should handle empty array', () => {
      expect(unique([])).toEqual([]);
    });

    it('should handle array with no duplicates', () => {
      expect(unique([1, 2, 3])).toEqual([1, 2, 3]);
    });
  });

  describe('chunk', () => {
    it('should split array into chunks', () => {
      expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    });

    it('should handle exact division', () => {
      expect(chunk([1, 2, 3, 4], 2)).toEqual([
        [1, 2],
        [3, 4],
      ]);
    });

    it('should handle chunk size larger than array', () => {
      expect(chunk([1, 2], 5)).toEqual([[1, 2]]);
    });

    it('should handle empty array', () => {
      expect(chunk([], 2)).toEqual([]);
    });

    it('should throw error for invalid chunk size', () => {
      expect(() => chunk([1, 2, 3], 0)).toThrow('Chunk size must be greater than 0');
      expect(() => chunk([1, 2, 3], -1)).toThrow('Chunk size must be greater than 0');
    });
  });

  describe('flatten', () => {
    it('should flatten one level by default', () => {
      expect(flatten([1, [2, [3, [4]]]])).toEqual([1, 2, [3, [4]]]);
    });

    it('should flatten to specified depth', () => {
      expect(flatten([1, [2, [3, [4]]]], 2)).toEqual([1, 2, 3, [4]]);
    });

    it('should flatten completely with Infinity', () => {
      expect(flatten([1, [2, [3, [4]]]], Infinity)).toEqual([1, 2, 3, 4]);
    });

    it('should handle mixed types', () => {
      expect(flatten(['a', ['b', ['c', 'd']]], 2)).toEqual(['a', 'b', 'c', 'd']);
    });

    it('should not flatten with depth 0', () => {
      expect(flatten([1, [2, 3]], 0)).toEqual([1, [2, 3]]);
    });

    it('should handle empty arrays', () => {
      expect(flatten([[], [[]]], 2)).toEqual([]);
    });
  });

  describe('groupBy', () => {
    it('should group by object key', () => {
      const data = [{ age: 21 }, { age: 22 }, { age: 21 }];
      expect(groupBy(data, 'age')).toEqual({
        '21': [{ age: 21 }, { age: 21 }],
        '22': [{ age: 22 }],
      });
    });

    it('should group by function', () => {
      const data = [1.3, 2.1, 2.4];
      expect(groupBy(data, Math.floor)).toEqual({
        '1': [1.3],
        '2': [2.1, 2.4],
      });
    });

    it('should handle string keys', () => {
      const data = [
        { type: 'fruit', name: 'apple' },
        { type: 'vegetable', name: 'carrot' },
        { type: 'fruit', name: 'banana' },
      ];
      expect(groupBy(data, 'type')).toEqual({
        fruit: [
          { type: 'fruit', name: 'apple' },
          { type: 'fruit', name: 'banana' },
        ],
        vegetable: [{ type: 'vegetable', name: 'carrot' }],
      });
    });

    it('should handle empty array', () => {
      expect(groupBy([], 'key')).toEqual({});
    });

    it('should handle complex grouping functions', () => {
      const data = ['one', 'two', 'three', 'four', 'five'];
      const result = groupBy(data, item => item.length);
      expect(result).toEqual({
        '3': ['one', 'two'],
        '4': ['four', 'five'],
        '5': ['three'],
      });
    });
  });
});
