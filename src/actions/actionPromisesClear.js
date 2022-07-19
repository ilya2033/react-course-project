import { all, put } from "redux-saga/effects";
import { actionPromiseClear } from "../reducers";

export const actionPromisesClear = (promises = []) => ({ type: "PROMISES_CLEAR", payload: promises });

export function* promisesClearWorker(action) {
    const promises = action.payload || [];
    yield all(promises.map((promise) => put(actionPromiseClear(promise))));
}
