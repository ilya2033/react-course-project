import { put, take } from "redux-saga/effects";
import { actionFeedClear, actionFeedOrdersFind, actionPromiseClear } from "../reducers";

export const actionOrdersSearchPage = ({ orderBy = "_id", text, status } = {}) => ({
    type: "ORDERS_SEARCH_PAGE",
    payload: { orderBy, text, status },
});
export function* ordersSearchPageWorker(action) {
    const { orderBy = "_id", text, status } = action.payload || {};
    yield put(actionFeedClear());
    yield put(actionPromiseClear("feedOrdersFind"));
    yield put(actionFeedOrdersFind({ text, orderBy, skip: 0, status }));

    yield take("ORDERS_SEARCH_PAGE_CLEAR");

    yield put(actionFeedClear());
    yield put(actionPromiseClear("feedOrdersFind"));
}
