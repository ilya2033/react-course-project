import { actionCatAll } from "../actions/actionCatAll";
import { actionGoodsFind } from "../actions/actionGoodsFind";
import { actionCatsFind } from "../actions/actionCatsFind";
import { actionGoodsAll } from "../actions/actionGoodsAll";
import { actionOrdersAll } from "../actions/actionOrdersAll";
import { actionOrdersFind } from "../actions/actionOrdersFind";
import { actionCategoryGoods } from "../actions/actionCategoryGoods";
import { actionUsersFind } from "../actions/actionUsersFind";
import { actionUsersAll } from "../actions/actionUsersAll";
import { put, takeLatest, takeLeading } from "redux-saga/effects";

function feedReducer(state = { payload: [] }, { type, payload = [] }) {
    if (type === "FEED_ADD") {
        return {
            ...state,
            payload: [...new Map([...state["payload"], ...payload].map((item) => [item["_id"], item])).values()],
        };
    }

    if (type === "FEED_CLEAR") {
        return { payload: [] };
    }
    return state || { payload: [] };
}

const actionFeedAdd = (payload) => ({ type: "FEED_ADD", payload });
const actionFeedClear = () => ({ type: "FEED_CLEAR" });

const actionFeedGoods = ({ skip = 0, orderBy = "_id" } = {}) => ({
    type: "FEED_GOODS",
    payload: { skip, orderBy },
});

function* feedGoodsWorker(action) {
    const { skip = 0, orderBy = "_id" } = action.payload || {};
    yield put(actionGoodsAll({ skip, limit: 1, promiseName: "feedGoodsAll", orderBy }));
}

const actionFeedCategoryGoods = ({ skip = 0, orderBy = "_id", category } = {}) => ({
    type: "FEED_CATEGORY_GOODS",
    payload: { skip, orderBy, category },
});

function* feedCategoryGoodsWorker(action) {
    const { skip = 0, orderBy = "_id", category } = action.payload || {};

    yield put(actionCategoryGoods({ skip, limit: 1, promiseName: "feedCategoryGoods", orderBy, category }));
}

const actionFeedGoodsFind = ({ skip = 0, text = "", orderBy = "_id" } = {}) => ({
    type: "FEED_GOODS_FIND",
    payload: { skip, text, orderBy },
});

function* feedGoodsFindWorker(action) {
    const { skip = 0, text = "", orderBy = "_id" } = action.payload || {};
    yield put(actionGoodsFind({ skip, limit: 1, promiseName: "feedGoodsFind", text, orderBy }));
}

const actionFeedCatsFind =
    ({ skip = 0, text = "", orderBy = "_id" }) =>
    async (dispatch, getState) => {
        await dispatch(actionCatsFind({ skip, promiseName: "feedCatsFind", text, limit: 1, orderBy }));
    };

const actionFeedCats = ({ skip = 0, orderBy = "_id" } = {}) => ({
    type: "FEED_CATS",
    payload: { skip, orderBy },
});

function* feedCatsWorker(action) {
    const { skip = 0, orderBy = "_id" } = action.payload || {};
    yield put(actionCatAll({ promiseName: "feedCatAll", skip, limit: 1, orderBy }));
}

const actionFeedOrders =
    ({ skip = 0, orderBy = "_id", status = 0 }) =>
    async (dispatch, getState) => {
        await dispatch(actionOrdersAll({ skip, limit: 1, promiseName: "feedOrdersAll", orderBy, status }));
    };

const actionFeedOrdersFind =
    ({ skip = 0, text = "", orderBy = "_id", status = "0" }) =>
    async (dispatch, getState) => {
        await dispatch(actionOrdersFind({ skip, limit: 1, promiseName: "feedOrdersFind", text, orderBy, status }));
    };

const actionFeedUsersFind =
    ({ skip = 0, text = "", orderBy = "_id" }) =>
    async (dispatch, getState) => {
        await dispatch(actionUsersFind({ skip, promiseName: "feedUsersFind", text, limit: 1, orderBy }));
    };

const actionFeedUsers =
    ({ skip = 0, orderBy = "_id" }) =>
    async (dispatch, getState) => {
        await dispatch(actionUsersAll({ promiseName: "feedUsersAll", skip, limit: 1, orderBy }));
    };

export {
    actionFeedCats,
    actionFeedCatsFind,
    actionFeedGoods,
    actionFeedClear,
    actionFeedAdd,
    actionFeedGoodsFind,
    feedReducer,
    actionFeedOrders,
    actionFeedOrdersFind,
    actionFeedCategoryGoods,
    actionFeedUsers,
    actionFeedUsersFind,
};

export function* feedWatcher() {
    yield takeLeading("FEED_CATEGORY_GOODS", feedCategoryGoodsWorker);
    yield takeLeading("FEED_GOODS_FIND", feedGoodsFindWorker);
    yield takeLeading("FEED_GOODS", feedGoodsWorker);
    yield takeLeading("FEED_CATS", feedCatsWorker);
}
