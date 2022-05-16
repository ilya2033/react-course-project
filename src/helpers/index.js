import { jwtDecode } from './jwtDecode';
import { getQuery } from './getQuery';
import { mock } from './mock';
import { delay } from './delay';
import { statusNumber, statusOptions } from './orderStatus';

export const query = getQuery('/');

export { jwtDecode, getQuery, mock, delay, statusNumber, statusOptions };
