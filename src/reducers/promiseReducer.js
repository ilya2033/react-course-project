import { put, takeEvery } from "redux-saga/effects";
import { aboutMeWorker } from "../actions/actionAboutMe";
import { pageStartWorker } from "../actions/actionPageStart";

export function promiseReducer(state = {}, { type, name, status, payload, error }) {
    if (type === "PROMISE") {
        return {
            ...state,
            [name]: { status, payload: status === "PROMISE" ? [name].payload : payload, error },
        };
    }
    if (type === "PROMISE_CLEAR") {
        const { [name]: toRemove, ...newState } = state;
        return newState;
    }
    return state;
}

export const actionPending = (name) => ({ type: "PROMISE", name, status: "PENDING" });
export const actionFulfilled = (name, payload) => ({ type: "PROMISE", name, status: "FULFILLED", payload });
export const actionRejected = (name, error) => ({ type: "PROMISE", name, status: "REJECTED", error });
export const actionPromiseClear = (name) => ({ type: "PROMISE_CLEAR", name });

export const actionPromise = (name, promise) => ({ type: "PROMISE_START", name, promise });

export function* promiseWorker(action) {
    const { name, promise } = action;
    yield put(actionPending(name));
    try {
        let data = yield promise;
        yield put(actionFulfilled(name, data));
        return data;
    } catch (error) {
        yield put(actionRejected(name, error));
    }
}

export function* promiseWatcher() {
    yield takeEvery("PROMISE_START", promiseWorker);
    yield takeEvery("PAGE_START", pageStartWorker);
    yield takeEvery("ABOUT_ME", aboutMeWorker);
}
