import { jwtDecode } from './jwtDecode';
import { getQuery } from './getQuery';
import { mock } from './mock';
import { delay } from './delay';

export const query = getQuery('/');

export { jwtDecode, getQuery, mock, delay };
