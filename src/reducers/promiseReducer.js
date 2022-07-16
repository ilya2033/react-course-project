import { put, takeEvery, takeLatest } from "redux-saga/effects";
import { aboutMeWorker } from "../actions/actionAboutMe";
import { catByIdFullWorker } from "../actions/actionCatByIdFull";
import { categoriesPageWorker } from "../actions/actionCategoriesPage";
import { categoryGoodsWorker } from "../actions/actionCategoryGoods";
import { goodPageWorker } from "../actions/actionGoodPage";
import { goodsFindWorker } from "../actions/actionGoodsFind";
import { goodsPageWorker } from "../actions/actionGoodsPage";
import { goodsSearchPageWorker } from "../actions/actionGoodsSearchPage";
import { orderUpdateWorker } from "../actions/actionOrderUpdate";
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
    yield takeLatest("PAGE_START", pageStartWorker);
    yield takeLatest("ABOUT_ME", aboutMeWorker);
    yield takeLatest("CAT_BY_ID_FULL", catByIdFullWorker);
    yield takeLatest("CATEGORY_GOODS", categoryGoodsWorker);
    yield takeLatest("ORDER_UPDATE", orderUpdateWorker);
    yield takeLatest("GOODS_FIND", goodsFindWorker);
    yield takeLatest("GOOD_PAGE", goodPageWorker);
    yield takeLatest("GOODS_SEARCH_PAGE", goodsSearchPageWorker);
    yield takeLatest("CATEGORIES_PAGE", categoriesPageWorker);
    yield takeLatest("GOODS_PAGE", goodsPageWorker);
}
