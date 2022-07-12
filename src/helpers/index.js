import { jwtDecode } from "./jwtDecode";

import { getGQL } from "./GraphQL";
import { statusNumber, statusOptions } from "./orderStatus";
import { aclList } from "./aclList";

export const backendURL = "";
export const gql = getGQL(backendURL + "/graphql/");

export const mediaURL = "";
export { jwtDecode, statusNumber, statusOptions, aclList };
