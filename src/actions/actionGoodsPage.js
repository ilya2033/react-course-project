import { put, take } from "redux-saga/effects";
import { actionFeedClear, actionFeedGoods, actionPromiseClear } from "../reducers";

export const actionGoodsPage = ({ orderBy }) => ({ type: "GOODS_PAGE", payload: { orderBy } });
export function* goodsPageWorker(action) {
    const { orderBy = "_id" } = action.payload || {};
    yield put(actionFeedClear());
    yield put(actionPromiseClear("feedGoodsAll"));
    yield put(actionFeedGoods({ skip: 0, orderBy }));

    yield take("GOODS_PAGE_CLEAR");

    yield put(actionFeedClear());
    yield put(actionPromiseClear("feedGoodsAll"));
    yield put(actionPromiseClear("goodUpsert"));
}
