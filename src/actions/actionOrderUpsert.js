import { gql } from "../helpers";
import { actionPromise } from "../reducers";

export const actionOrderUpsert = (order) =>
    actionPromise(
        "orderUpsert",
        gql(
            `mutation newOrder($order:OrderInput!){
                  OrderUpsert(order:$order){
                    _id price
                  }
                }
            `,
            {
                order,
            }
        )
    );
