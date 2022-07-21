import { actionUploadFile } from "./actionUploadFile";
import { actionPromise } from "../reducers";
import { all, call } from "redux-saga/effects";
import { promiseWorker } from "../reducers/promiseReducer";

export const actionUploadFiles = (files = []) => ({ type: "UPLOAD_FILES", payload: files });

export function* uploadFilesWorker(action) {
    const files = action.payload || [];
    yield call(promiseWorker, actionPromise("uploadFiles", yield all(files.map((file) => call(promiseWorker, actionUploadFile(file))))));
}
