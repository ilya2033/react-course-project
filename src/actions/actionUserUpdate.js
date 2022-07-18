import { call, put, select } from "redux-saga/effects";
import { actionPromiseClear } from "../reducers";
import { promiseWorker } from "../reducers/promiseReducer";
import { actionAboutMe } from "./actionAboutMe";
import { actionUserUpsert } from "./actionUserUpsert";

export const actionUserUpdate = (user) => ({ type: "USER_UPDATE", payload: user });

export function* userUpdateWorker(action) {
    const user = action.payload || {};
    if (!user) {
        return;
    }

    yield call(promiseWorker, actionUserUpsert(user));

    const {
        promise: {
            userUpsert: { status },
        },
    } = yield select();

    if (status === "FULFILLED") {
        yield put(actionAboutMe());
    }

    yield put(actionPromiseClear("userUpsert"));
}
