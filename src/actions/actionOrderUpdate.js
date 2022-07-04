import { actionCartClear, actionPromiseClear } from "../reducers";
import { actionOrdersAll } from "./actionOrdersAll";
import { actionOrderUpsert } from "./actionOrderUpsert";

export const actionOrderUpdate = (orderGoods) => async (dispatch, getState) => {
  await dispatch(actionOrderUpsert(orderGoods));
  await dispatch(actionOrdersAll());
};
