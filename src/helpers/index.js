import { jwtDecode } from "./jwtDecode";

import { getGQL } from "./GraphQL";
import { delay } from "./delay";
import { statusNumber, statusOptions } from "./orderStatus";

export const backendURL = "";
export const gql = getGQL(backendURL + "/graphql/");
export { jwtDecode, delay, statusNumber, statusOptions };
