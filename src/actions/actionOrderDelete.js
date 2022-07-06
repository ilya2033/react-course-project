import { backendURL, getQuery, gql, mock, query } from "../helpers";

import { actionPromise } from "../reducers";

export const actionOrderDelete = ({ order, promiseName = "orderDelete" } = {}) =>
    actionPromise(
        promiseName,
        gql(
            `mutation OrderDelete($order:OrderInput!){
            OrderDelete(order:$order){
              _id price
            }
          }
      `,
            { order }
        )
    );
