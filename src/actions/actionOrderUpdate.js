import { call, put, select } from "redux-saga/effects";
import { actionCartClear } from "../reducers";
import { promiseWorker } from "../reducers/promiseReducer";
import { actionOrdersAll } from "./actionOrdersAll";
import { actionOrderUpsert } from "./actionOrderUpsert";
export const actionOrderUpdate = (order) => ({ type: "ORDER_UPDATE", payload: order });
export function* orderUpdateWorker(action) {
    const order = action.payload || {};
    if (!order?.orderGoods?.length) {
        return;
    }
    yield call(promiseWorker, actionOrderUpsert(order));
    yield put(actionOrdersAll());

    const {
        promise: { orderUpsert },
    } = yield select();

    if (orderUpsert.status === "FULFILLED") {
        yield put(actionCartClear());
    }
}
