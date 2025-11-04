/**
 * Creates a deep clone of an object
 * @param obj - The object to clone
 * @returns A deep copy of the object
 * @example
 * const original = { a: 1, b: { c: 2 } };
 * const cloned = deepClone(original);
 * cloned.b.c = 3; // original.b.c remains 2
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }

  if (obj instanceof Array) {
    return obj.map(item => deepClone(item)) as T;
  }

  if (obj instanceof Object) {
    const clonedObj = {} as T;
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }

  return obj;
}

/**
 * Deeply merges two or more objects
 * @param target - The target object
 * @param sources - Source objects to merge
 * @returns The merged object
 * @example
 * merge({ a: 1 }, { b: 2 }, { c: 3 }) // returns { a: 1, b: 2, c: 3 }
 * merge({ a: { x: 1 } }, { a: { y: 2 } }) // returns { a: { x: 1, y: 2 } }
 */
export function merge<T extends Record<string, unknown>>(
  target: T,
  ...sources: Partial<T>[]
): T {
  if (!sources.length) return target;

  const result = deepClone(target);

  for (const source of sources) {
    if (!source || typeof source !== 'object') continue;

    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        const sourceValue = source[key];
        const targetValue = result[key];

        if (
          sourceValue &&
          typeof sourceValue === 'object' &&
          !Array.isArray(sourceValue) &&
          targetValue &&
          typeof targetValue === 'object' &&
          !Array.isArray(targetValue)
        ) {
          result[key] = merge(
            targetValue as Record<string, unknown>,
            sourceValue as Record<string, unknown>
          ) as T[Extract<keyof T, string>];
        } else {
          result[key] = deepClone(sourceValue) as T[Extract<keyof T, string>];
        }
      }
    }
  }

  return result;
}

/**
 * Creates a new object with specified keys omitted
 * @param obj - The source object
 * @param keys - Keys to omit
 * @returns A new object without the specified keys
 * @example
 * omit({ a: 1, b: 2, c: 3 }, ['b', 'c']) // returns { a: 1 }
 */
export function omit<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result;
}

/**
 * Creates a new object with only specified keys
 * @param obj - The source object
 * @param keys - Keys to pick
 * @returns A new object with only the specified keys
 * @example
 * pick({ a: 1, b: 2, c: 3 }, ['a', 'c']) // returns { a: 1, c: 3 }
 */
export function pick<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = obj[key];
    }
  }
  return result;
}
