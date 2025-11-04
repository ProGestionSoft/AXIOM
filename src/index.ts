export { slugify, capitalize, truncate, randomString } from './string/index.js';

export { formatNumber, clamp, roundTo, percent } from './number/index.js';

export { formatDate, timeAgo, isValidDate } from './date/index.js';

export { deepClone, merge, omit, pick } from './object/index.js';

export { unique, chunk, flatten, groupBy } from './array/index.js';

import * as string from './string/index.js';
import * as number from './number/index.js';
import * as date from './date/index.js';
import * as object from './object/index.js';
import * as array from './array/index.js';

export default {
  ...string,
  ...number,
  ...date,
  ...object,
  ...array,
};
