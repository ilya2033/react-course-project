import { call, delay, put, select } from "redux-saga/effects";
import { actionPromiseClear } from "../reducers";
import { promiseWorker } from "../reducers/promiseReducer";
import { actionAboutMe } from "./actionAboutMe";
import { actionLogout } from "./actionLogout";
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
        auth: {
            payload: {
                sub: { acl },
                username,
            },
        },
    } = yield select();

    if (status === "FULFILLED") {
        if (!acl?.includes("admin") && user?.username !== username) {
            yield put(actionLogout());
        } else {
            yield put(actionAboutMe());
        }
    }

    yield delay(500);
    yield put(actionPromiseClear("userUpsert"));
}
