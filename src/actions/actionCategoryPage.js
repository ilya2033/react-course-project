import { put, take } from "redux-saga/effects";
import { actionPromiseClear } from "../reducers";
import { actionCatAll } from "./actionCatAll";
import { actionCatById } from "./actionCatById";
import { actionGoodsAll } from "./actionGoodsAll";
import { actionPromisesClear } from "./actionPromisesClear";

export const actionCategoryPage = ({ _id, promiseName = "catById" } = {}) => ({ type: "CATEGORY_PAGE", payload: { _id, promiseName } });
export function* categoryPageWorker(action) {
    const { _id, promiseName = "catById" } = action.payload || {};
    yield put(actionGoodsAll());
    yield put(actionCatAll());

    if (_id) {
        yield put(actionCatById({ _id, promiseName }));
    } else {
        yield put(actionPromiseClear(promiseName));
    }

    yield take("CATEGORY_PAGE_CLEAR");

    yield put(actionPromisesClear([promiseName, "catAll", "goodsAll"]));
}
