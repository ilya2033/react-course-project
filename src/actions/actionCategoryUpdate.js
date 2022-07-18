import { call, put } from "redux-saga/effects";
import { promiseWorker } from "../reducers/promiseReducer";
import { actionCatAll } from "./actionCatAll";
import { actionCategoryUpsert } from "./actionCategoryUpsert";
import { actionRootCats } from "./actionRootCats";

export const actionCategoryUpdate = (category) => ({ type: "CATEGORY_UPDATE", payload: category });

export function* categoryUpdateWorker(action) {
    const category = action.payload || {};
    yield call(promiseWorker, actionCategoryUpsert(category));
    yield put(actionCatAll());
    yield put(actionRootCats());
}
