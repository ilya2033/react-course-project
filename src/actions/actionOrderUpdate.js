import { actionOrdersAll } from "./actionOrdersAll";
import { actionOrderUpsert } from "./actionOrderUpsert";

export const actionOrderUpdate = (order) => async (dispatch, getState) => {
    await dispatch(actionOrderUpsert(order));
    await dispatch(actionOrdersAll());
};
