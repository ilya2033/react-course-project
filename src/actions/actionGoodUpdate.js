import { call, put } from "redux-saga/effects";
import { promiseWorker } from "../reducers/promiseReducer";
import { actionGoodsAll } from "./actionGoodsAll";
import { actionGoodUpsert } from "./actionGoodUpsert";

export const actionGoodUpdate = (good) => ({ type: "GOOD_UPDATE", payload: good });

export function* goodUpdateWorker(action) {
    const good = action.payload || {};
    yield call(promiseWorker, actionGoodUpsert(good));
    yield put(actionGoodsAll());
}
