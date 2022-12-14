import { actionAboutMe } from "./actionAboutMe";
import { actionCatAll } from "./actionCatAll";
import { actionGoodsPopular } from "./actionGoodsPopular";
import { actionOrders } from "./actionOrders";
import { actionRootCats } from "./actionRootCats";
import { put, select } from "redux-saga/effects";

export const actionPageStart = () => ({ type: "PAGE_START" });

export function* pageStartWorker() {
    yield put(actionRootCats());
    yield put(actionCatAll());
    yield put(actionGoodsPopular());

    const {
        auth: { token },
    } = yield select();

    if (token) {
        yield put(actionAboutMe());
        yield put(actionOrders());
    }
}
