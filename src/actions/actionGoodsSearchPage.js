import { put, take } from "redux-saga/effects";
import { actionFeedClear, actionFeedGoodsFind, actionPromiseClear } from "../reducers";

export const actionGoodsSearchPage = ({ orderBy = "_id", text } = {}) => ({ type: "GOODS_SEARCH_PAGE", payload: { orderBy, text } });

export function* goodsSearchPageWorker(action) {
    const { orderBy = "_id", text } = action.payload || {};
    yield put(actionFeedClear());
    yield put(actionPromiseClear("feedGoodsFind"));
    yield put(actionFeedGoodsFind({ text, orderBy, skip: 0 }));
    yield take("GOODS_SEARCH_PAGE_CLEAR");

    yield put(actionFeedClear());
    yield put(actionPromiseClear("feedGoodsFind"));
}
