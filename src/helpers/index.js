import { jwtDecode } from './jwtDecode';
import { getQuery } from './getQuery';
import { mock } from './mock';

export const query = getQuery('/');

export { jwtDecode, getQuery, mock };
