import { jwtDecode } from './jwtDecode';
import { mock } from './mock';
import { getGQL } from './GraphQL';
import { delay } from './delay';
import { statusNumber, statusOptions } from './orderStatus';

export const backendURL = '';
export const gql = getGQL(backendURL + '/graphql/');
export { jwtDecode, mock, delay, statusNumber, statusOptions };
