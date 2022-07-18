import { put, take } from "redux-saga/effects";
import { actionFeedClear, actionFeedOrders, actionPromiseClear } from "../reducers";

export const actionOrdersPage = ({ orderBy = "_id", status = "0" } = {}) => ({ type: "ORDERS_PAGE", payload: { orderBy, status } });

export function* ordersPageWorker(action) {
    const { orderBy = "_id", status = "0" } = action.payload || {};
    yield put(actionFeedClear());
    yield put(actionPromiseClear("feedOrdersAll"));

    yield put(actionFeedOrders({ skip: 0, orderBy, status }));

    yield take("ORDERS_PAGE_CLEAR");

    yield put(actionFeedClear());
    yield put(actionPromiseClear("feedOrdersAll"));
}
