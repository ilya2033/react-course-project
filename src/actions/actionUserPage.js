import { put, take } from "redux-saga/effects";
import { actionPromiseClear } from "../reducers";
import { actionUserById } from "./actionUserById";

export const actionUserPage = ({ _id, promiseName = "userById" } = {}) => ({ type: "USER_PAGE", payload: { _id, promiseName } });

export function* userPageWorker(action) {
    const { _id, promiseName = "userById" } = action.payload || {};
    yield put(actionPromiseClear("uploadFile"));

    if (_id) {
        yield put(actionUserById({ _id, promiseName }));
    } else {
        yield put(actionPromiseClear(promiseName));
    }

    yield take("USER_PAGE_CLEAN");

    yield put(actionPromiseClear(promiseName));
    yield put(actionPromiseClear("uploadFile"));
}
