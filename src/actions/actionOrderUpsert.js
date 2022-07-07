import { backendURL, gql } from "../helpers";
import { actionCartClear, actionPromise } from "../reducers";

export const actionOrderUpsert = (order) => async (dispatch, getState) => {
    if (!order?.orderGoods?.length) {
        return;
    }
    await dispatch(
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
        )
    );
    let {
        promise: { orderUpsert },
    } = getState();

    if (orderUpsert.status === "FULFILLED") {
        dispatch(actionCartClear());
        // dispatch(actionOrders(token));
    }
};
