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
      const groupKey =
        typeof key === 'function' ? String(key(item)) : String(item[key]);

      if (!result[groupKey]) {
        result[groupKey] = [];
      }

      result[groupKey]?.push(item);
      return result;
    },
    {} as Record<string, T[]>
  );
}
