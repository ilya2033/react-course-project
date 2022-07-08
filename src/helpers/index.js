import { jwtDecode } from "./jwtDecode";

import { getGQL } from "./GraphQL";
import { delay } from "./delay";
import { statusNumber, statusOptions } from "./orderStatus";

export const backendURL = "http://188.72.209.29/api";
export const gql = getGQL(backendURL + "/graphql/");
export const mediaURL = "/media/";
export { jwtDecode, delay, statusNumber, statusOptions };
