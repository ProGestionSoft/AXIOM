import { describe, it, expect } from 'vitest';
import { unique, chunk, flatten, groupBy, paginate } from '../src/array/index.js';

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

describe('paginate', () => {
  const testData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  describe('Offset-based pagination', () => {
    it('should paginate with offset and limit', () => {
      const result = paginate(testData, { type: 'offset', offset: 0, limit: 3 });

      expect(result.type).toBe('offset');
      expect(result.data).toEqual([1, 2, 3]);
      expect(result.total).toBe(10);
      expect(result.hasMore).toBe(true);
      expect(result.offset).toBe(0);
      expect(result.limit).toBe(3);
    });

    it('should handle offset in the middle', () => {
      const result = paginate(testData, { type: 'offset', offset: 5, limit: 3 });

      expect(result.data).toEqual([6, 7, 8]);
      expect(result.hasMore).toBe(true);
    });

    it('should handle last page with offset', () => {
      const result = paginate(testData, { type: 'offset', offset: 9, limit: 3 });

      expect(result.data).toEqual([10]);
      expect(result.hasMore).toBe(false);
    });

    it('should throw error for negative offset', () => {
      expect(() => paginate(testData, { type: 'offset', offset: -1, limit: 3 })).toThrow(
        'Offset must be non-negative'
      );
    });

    it('should throw error for invalid limit', () => {
      expect(() => paginate(testData, { type: 'offset', offset: 0, limit: 0 })).toThrow(
        'Limit must be greater than 0'
      );
    });
  });

  describe('Page-based pagination', () => {
    it('should paginate with page number and page size', () => {
      const result = paginate(testData, { type: 'page', page: 1, pageSize: 3 });

      expect(result.type).toBe('page');
      expect(result.data).toEqual([1, 2, 3]);
      expect(result.total).toBe(10);
      expect(result.hasMore).toBe(true);
      expect(result.page).toBe(1);
      expect(result.pageSize).toBe(3);
      expect(result.totalPages).toBe(4);
    });

    it('should handle second page', () => {
      const result = paginate(testData, { type: 'page', page: 2, pageSize: 3 });

      expect(result.data).toEqual([4, 5, 6]);
      expect(result.hasMore).toBe(true);
      expect(result.totalPages).toBe(4);
    });

    it('should handle last page', () => {
      const result = paginate(testData, { type: 'page', page: 4, pageSize: 3 });

      expect(result.data).toEqual([10]);
      expect(result.hasMore).toBe(false);
    });

    it('should throw error for invalid page number', () => {
      expect(() => paginate(testData, { type: 'page', page: 0, pageSize: 3 })).toThrow(
        'Page must be greater than or equal to 1'
      );
    });

    it('should throw error for invalid page size', () => {
      expect(() => paginate(testData, { type: 'page', page: 1, pageSize: -1 })).toThrow(
        'Page size must be greater than 0'
      );
    });
  });

  describe('Cursor-based pagination', () => {
    const items = [
      { id: 'a', value: 1 },
      { id: 'b', value: 2 },
      { id: 'c', value: 3 },
      { id: 'd', value: 4 },
      { id: 'e', value: 5 },
    ];

    it('should paginate with cursor', () => {
      const result = paginate(items, {
        type: 'cursor',
        cursor: null,
        limit: 2,
        getCursorValue: (item) => item.id,
      });

      expect(result.type).toBe('cursor');
      expect(result.data).toEqual([
        { id: 'a', value: 1 },
        { id: 'b', value: 2 },
      ]);
      expect(result.total).toBe(5);
      expect(result.hasMore).toBe(true);
      expect(result.nextCursor).toBe('b');
      expect(result.prevCursor).toBe(null);
    });

    it('should paginate from specific cursor', () => {
      const result = paginate(items, {
        type: 'cursor',
        cursor: 'b',
        limit: 2,
        getCursorValue: (item) => item.id,
      });

      expect(result.data).toEqual([
        { id: 'c', value: 3 },
        { id: 'd', value: 4 },
      ]);
      expect(result.hasMore).toBe(true);
      expect(result.nextCursor).toBe('d');
      expect(result.prevCursor).toBe('b');
    });

    it('should handle last page with cursor', () => {
      const result = paginate(items, {
        type: 'cursor',
        cursor: 'd',
        limit: 2,
        getCursorValue: (item) => item.id,
      });

      expect(result.data).toEqual([{ id: 'e', value: 5 }]);
      expect(result.hasMore).toBe(false);
      expect(result.nextCursor).toBe(null);
    });

    it('should throw error for invalid cursor', () => {
      expect(() =>
        paginate(items, {
          type: 'cursor',
          cursor: 'invalid',
          limit: 2,
          getCursorValue: (item) => item.id,
        })
      ).toThrow('Cursor not found in array');
    });

    it('should throw error for invalid limit', () => {
      expect(() =>
        paginate(items, {
          type: 'cursor',
          cursor: null,
          limit: 0,
          getCursorValue: (item) => item.id,
        })
      ).toThrow('Limit must be greater than 0');
    });
  });

  describe('Edge cases', () => {
    it('should handle empty array with offset pagination', () => {
      const result = paginate([], { type: 'offset', offset: 0, limit: 5 });

      expect(result.data).toEqual([]);
      expect(result.total).toBe(0);
      expect(result.hasMore).toBe(false);
    });

    it('should handle empty array with page pagination', () => {
      const result = paginate([], { type: 'page', page: 1, pageSize: 5 });

      expect(result.data).toEqual([]);
      expect(result.total).toBe(0);
      expect(result.totalPages).toBe(0);
      expect(result.hasMore).toBe(false);
    });

    it('should handle empty array with cursor pagination', () => {
      const result = paginate([], {
        type: 'cursor',
        cursor: null,
        limit: 5,
        getCursorValue: (item: any) => item.id,
      });

      expect(result.data).toEqual([]);
      expect(result.total).toBe(0);
      expect(result.hasMore).toBe(false);
      expect(result.nextCursor).toBe(null);
    });
  });
});
