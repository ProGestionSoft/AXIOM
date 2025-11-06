/**
 * Returns an array with unique values
 * @param arr - The array to process
 * @returns An array with duplicate values removed
 * @example
 * unique([1, 2, 2, 3, 3, 3]) // returns [1, 2, 3]
 * unique(['a', 'b', 'a']) // returns ['a', 'b']
 */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

/**
 * Splits an array into chunks of specified size
 * @param arr - The array to chunk
 * @param size - The size of each chunk
 * @returns An array of chunks
 * @example
 * chunk([1, 2, 3, 4, 5], 2) // returns [[1, 2], [3, 4], [5]]
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  if (size <= 0) {
    throw new Error('Chunk size must be greater than 0');
  }

  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

/**
 * Flattens a nested array to a specified depth
 * @param arr - The array to flatten
 * @param depth - The depth to flatten (default: 1)
 * @returns A flattened array
 * @example
 * flatten([1, [2, [3, [4]]]]) // returns [1, 2, [3, [4]]]
 * flatten([1, [2, [3, [4]]]], 2) // returns [1, 2, 3, [4]]
 * flatten([1, [2, [3, [4]]]], Infinity) // returns [1, 2, 3, 4]
 */
export function flatten<T>(arr: unknown[], depth: number = 1): T[] {
  if (depth <= 0) {
    return arr as T[];
  }

  return arr.reduce<T[]>((acc, val) => {
    if (Array.isArray(val)) {
      acc.push(...flatten<T>(val, depth - 1));
    } else {
      acc.push(val as T);
    }
    return acc;
  }, []);
}

/**
 * Groups array elements by a key or function
 * @param arr - The array to group
 * @param key - A key name or function to determine grouping
 * @returns An object with grouped elements
 * @example
 * groupBy([{ age: 21 }, { age: 22 }, { age: 21 }], 'age')
 * // returns { '21': [{ age: 21 }, { age: 21 }], '22': [{ age: 22 }] }
 *
 * groupBy([1.3, 2.1, 2.4], Math.floor)
 * // returns { '1': [1.3], '2': [2.1, 2.4] }
 */
export function groupBy<T>(
  arr: T[],
  key: keyof T | ((item: T) => string | number)
): Record<string, T[]> {
  return arr.reduce(
    (result, item) => {
      const groupKey = typeof key === 'function' ? String(key(item)) : String(item[key]);

      if (!result[groupKey]) {
        result[groupKey] = [];
      }

      result[groupKey]?.push(item);
      return result;
    },
    {} as Record<string, T[]>
  );
}

/**
 * Pagination types
 */
export type PaginationType = 'offset' | 'page' | 'cursor';

/**
 * Base pagination result interface
 */
export interface PaginationResult<T> {
  data: T[];
  total: number;
  hasMore: boolean;
}

/**
 * Offset-based pagination result
 */
export interface OffsetPaginationResult<T> extends PaginationResult<T> {
  type: 'offset';
  offset: number;
  limit: number;
}

/**
 * Page-based pagination result
 */
export interface PagePaginationResult<T> extends PaginationResult<T> {
  type: 'page';
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * Cursor-based pagination result
 */
export interface CursorPaginationResult<T> extends PaginationResult<T> {
  type: 'cursor';
  nextCursor: string | null;
  prevCursor: string | null;
}

/**
 * Offset-based pagination options
 */
export interface OffsetPaginationOptions {
  type: 'offset';
  offset: number;
  limit: number;
}

/**
 * Page-based pagination options
 */
export interface PagePaginationOptions {
  type: 'page';
  page: number;
  pageSize: number;
}

/**
 * Cursor-based pagination options
 */
export interface CursorPaginationOptions<T> {
  type: 'cursor';
  cursor?: string | null;
  limit: number;
  getCursorValue: (item: T) => string;
}

/**
 * Union type for all pagination options
 */
export type PaginationOptions<T> =
  | OffsetPaginationOptions
  | PagePaginationOptions
  | CursorPaginationOptions<T>;

/**
 * Paginates an array with multiple pagination strategies
 * @param arr - The array to paginate
 * @param options - Pagination options (offset, page, or cursor-based)
 * @returns Paginated result with metadata
 * @example
 * // Offset-based pagination
 * paginate([1, 2, 3, 4, 5], { type: 'offset', offset: 2, limit: 2 })
 * // returns { type: 'offset', data: [3, 4], total: 5, hasMore: true, offset: 2, limit: 2 }
 *
 * // Page-based pagination
 * paginate([1, 2, 3, 4, 5], { type: 'page', page: 2, pageSize: 2 })
 * // returns { type: 'page', data: [3, 4], total: 5, hasMore: true, page: 2, pageSize: 2, totalPages: 3 }
 *
 * // Cursor-based pagination
 * const items = [{ id: '1' }, { id: '2' }, { id: '3' }];
 * paginate(items, { type: 'cursor', cursor: '1', limit: 2, getCursorValue: item => item.id })
 * // returns { type: 'cursor', data: [{ id: '2' }, { id: '3' }], total: 3, hasMore: false, nextCursor: null, prevCursor: '1' }
 */
export function paginate<T>(
  arr: T[],
  options: OffsetPaginationOptions
): OffsetPaginationResult<T>;
export function paginate<T>(arr: T[], options: PagePaginationOptions): PagePaginationResult<T>;
export function paginate<T>(
  arr: T[],
  options: CursorPaginationOptions<T>
): CursorPaginationResult<T>;
export function paginate<T>(
  arr: T[],
  options: PaginationOptions<T>
): OffsetPaginationResult<T> | PagePaginationResult<T> | CursorPaginationResult<T> {
  const total = arr.length;

  if (options.type === 'offset') {
    const { offset, limit } = options;

    if (offset < 0) {
      throw new Error('Offset must be non-negative');
    }
    if (limit <= 0) {
      throw new Error('Limit must be greater than 0');
    }

    const data = arr.slice(offset, offset + limit);
    const hasMore = offset + limit < total;

    return {
      type: 'offset',
      data,
      total,
      hasMore,
      offset,
      limit,
    };
  }

  if (options.type === 'page') {
    const { page, pageSize } = options;

    if (page < 1) {
      throw new Error('Page must be greater than or equal to 1');
    }
    if (pageSize <= 0) {
      throw new Error('Page size must be greater than 0');
    }

    const offset = (page - 1) * pageSize;
    const data = arr.slice(offset, offset + pageSize);
    const totalPages = Math.ceil(total / pageSize);
    const hasMore = page < totalPages;

    return {
      type: 'page',
      data,
      total,
      hasMore,
      page,
      pageSize,
      totalPages,
    };
  }

  if (options.type === 'cursor') {
    const { cursor, limit, getCursorValue } = options;

    if (limit <= 0) {
      throw new Error('Limit must be greater than 0');
    }

    let startIndex = 0;

    if (cursor !== undefined && cursor !== null) {
      // Find the index of the item after the cursor
      startIndex = arr.findIndex((item) => getCursorValue(item) === cursor);
      if (startIndex === -1) {
        throw new Error('Cursor not found in array');
      }
      startIndex += 1; // Start from the next item
    }

    const data = arr.slice(startIndex, startIndex + limit);
    const hasMore = startIndex + limit < total;

    const nextCursor = hasMore && data.length > 0 ? getCursorValue(data[data.length - 1]!) : null;
    const prevCursor = cursor || null;

    return {
      type: 'cursor',
      data,
      total,
      hasMore,
      nextCursor,
      prevCursor,
    };
  }

  throw new Error('Invalid pagination type');
}
