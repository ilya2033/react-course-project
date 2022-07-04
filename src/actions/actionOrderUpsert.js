import { backendURL, gql } from "../helpers";
import { actionCartClear, actionPromise } from "../reducers";

export const actionOrderUpsert = (orderGoods) => async (dispatch, getState) => {
  if (!orderGoods.length) {
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
          order: {
            orderGoods: orderGoods.map((orderGood) => ({
              count: orderGood.count,
              good: { _id: orderGood.good._id },
            })),
          },
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
