import { call, put, select } from "redux-saga/effects";
import { actionPromiseClear } from "../reducers";
import { promiseWorker } from "../reducers/promiseReducer";
import { actionAboutMe } from "./actionAboutMe";
import { actionUploadFile } from "./actionUploadFile";
import { actionUserUpsert } from "./actionUserUpsert";

export const actionUpdateAvatar = (file) => ({ type: "UPDATE_AVATAR", payload: file });

export function* updateAvatarWorker(action) {
    const file = action.payload;
    yield call(promiseWorker, actionUploadFile(file));

    const {
        promise: {
            uploadFile: {
                payload: { _id },
                status,
            },
        },
    } = yield select();

    yield call(promiseWorker, actionUserUpsert({ avatar: { _id } }));

    if (status === "FULFILLED") {
        yield put(actionAboutMe());
    }

    yield put(actionPromiseClear("uploadFile"));
}
