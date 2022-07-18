import { call, put, take } from "redux-saga/effects";
import { actionFeedClear, actionPromiseClear } from "../reducers";
import { actionFeedCategoryGoods } from "../reducers/feedReducer";
import { promiseWorker } from "../reducers/promiseReducer";
import { actionCatById } from "./actionCatById";
import { actionPromisesClear } from "./actionPromisesClear";

export const actionCatByIdFull = ({ _id, orderBy }) => ({ type: "CAT_BY_ID_FULL", payload: { _id, orderBy } });

export function* catByIdFullWorker(action) {
    const { _id, orderBy = "createdAt" } = action.payload || {};

    const category = yield call(promiseWorker, actionCatById({ _id }));

    yield put(actionFeedClear());
    yield put(actionPromiseClear("feedCategoryGoods"));
    yield put(actionFeedCategoryGoods({ category, orderBy, skip: 0 }));

    yield take("CAT_BY_ID_FULL_CLEAR");

    yield put(actionPromisesClear(["catById", "feedCategoryGoods"]));
    yield put(actionFeedClear());
}
