import { put, take } from "redux-saga/effects";
import { actionPromiseClear } from "../reducers";
import { actionCatAll } from "./actionCatAll";
import { actionGoodById } from "./actionGoodById";

export const actionGoodPage = ({ _id, promiseName } = {}) => ({
    type: "GOOD_PAGE",
    payload: { _id, promiseName },
});

export function* goodPageWorker(action) {
    const { _id, promiseName = "goodById" } = action.payload;
    yield put(actionCatAll());

    if (_id) {
        yield put(actionGoodById({ _id, promiseName }));
    } else {
        yield put(actionPromiseClear(promiseName));
    }

    yield take("GOOD_PAGE_CLEAR");

    yield put(actionPromiseClear(promiseName));
    yield put(actionPromiseClear("goodsAll"));
    yield put(actionPromiseClear("goodUpsert"));
}
