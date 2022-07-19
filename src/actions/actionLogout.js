import { put } from "redux-saga/effects";
import { actionCartClear, actionPromiseClear } from "../reducers";
import { actionAuthLogout } from "../reducers";

export const actionLogout = () => ({ type: "LOGOUT" });

export function* logoutWorker() {
    yield put(actionCartClear());
    yield put(actionAuthLogout());
    yield put(actionPromiseClear("aboutMe"));
}
