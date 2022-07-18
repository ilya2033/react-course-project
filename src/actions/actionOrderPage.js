import { put, take } from "redux-saga/effects";
import { actionPromiseClear } from "../reducers";
import { actionGoodsAll } from "./actionGoodsAll";
import { actionOrderById } from "./actionOrderById";
import { actionPromisesClear } from "./actionPromisesClear";
import { actionUsersAll } from "./actionUsersAll";

export const actionOrderPage = ({ _id, promiseName = "orderById" } = {}) => ({ type: "ORDER_PAGE", payload: { _id, promiseName } });

export function* orderPageWorker(action) {
    const { _id, promiseName = "orderById" } = action.payload || {};
    yield put(actionUsersAll());
    yield put(actionGoodsAll());

    if (_id) {
        yield put(actionOrderById({ _id, promiseName }));
    } else {
        yield put(actionPromiseClear(promiseName));
    }

    yield take("ORDER_PAGE_CLEAR");

    yield put(actionPromisesClear(["orderUpsert", "goodsAll", promiseName, "usersAll"]));
}
