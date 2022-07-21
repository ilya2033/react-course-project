import { actionCatAll } from "../actions/actionCatAll";
import { actionGoodsFind } from "../actions/actionGoodsFind";
import { actionCatsFind } from "../actions/actionCatsFind";
import { actionGoodsAll } from "../actions/actionGoodsAll";
import { actionOrdersAll } from "../actions/actionOrdersAll";
import { actionOrdersFind } from "../actions/actionOrdersFind";
import { actionCategoryGoods } from "../actions/actionCategoryGoods";
import { actionUsersFind } from "../actions/actionUsersFind";
import { actionUsersAll } from "../actions/actionUsersAll";
import { delay, put, takeLeading } from "redux-saga/effects";

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

const actionFeedGoods = ({ skip = 0, orderBy = "_id" }) => ({ type: "FEED_GOODS", payload: { skip, orderBy } });
function* feedGoodsWorker(action) {
    const { skip = 0, orderBy = "_id" } = action.payload || {};
    yield put(actionGoodsAll({ skip, limit: 10, promiseName: "feedGoodsAll", orderBy }));
    yield delay(500);
}

const actionFeedCategoryGoods = ({ skip = 0, orderBy = "_id", category }) => ({
    type: "FEED_CATEGORY_GOODS",
    payload: { skip, orderBy, category },
});
function* feedCategoryGoodsWorker(action) {
    const { skip = 0, orderBy = "_id", category = {} } = action.payload || {};
    yield put(actionCategoryGoods({ skip, limit: 8, promiseName: "feedCategoryGoods", orderBy, category }));
    yield delay(500);
}

const actionFeedGoodsFind = ({ skip = 0, text = "", orderBy = "_id" }) => ({ type: "FEED_GOODS_FIND", payload: { skip, text, orderBy } });
function* feedGoodsFindWorker(action) {
    const { skip = 0, text = "", orderBy = "_id" } = action.payload || {};
    yield put(actionGoodsFind({ skip, limit: 10, promiseName: "feedGoodsFind", text, orderBy }));
    yield delay(500);
}

const actionFeedCatsFind = ({ skip = 0, text = "", orderBy = "_id" }) => ({ type: "FEED_CATS_FIND", payload: { skip, text, orderBy } });
function* feedCatsFindWorker(action) {
    const { skip = 0, text = "", orderBy = "_id" } = action.payload || {};
    yield put(actionCatsFind({ skip, promiseName: "feedCatsFind", text, limit: 10, orderBy }));
    yield delay(500);
}

const actionFeedCats = ({ skip = 0, orderBy = "_id" }) => ({ type: "FEED_CATS", payload: { skip, orderBy } });
function* feedCatsWorker(action) {
    const { skip = 0, orderBy = "_id" } = action.payload || {};
    yield put(actionCatAll({ promiseName: "feedCatAll", skip, limit: 10, orderBy }));
    yield delay(500);
}

const actionFeedOrders = ({ skip = 0, orderBy = "_id", status = 0 }) => ({ type: "FEED_ORDERS", payload: { skip, orderBy, status } });
function* feedOrdersWorker(action) {
    const { skip = 0, orderBy = "_id", status = 0 } = action.payload || {};
    yield put(actionOrdersAll({ skip, limit: 10, promiseName: "feedOrdersAll", orderBy, status }));
    yield delay(500);
}

const actionFeedOrdersFind = ({ skip = 0, text = "", orderBy = "_id", status = "0" }) => ({
    type: "FEED_ORDERS_FIND",
    payload: { skip, text, orderBy, status },
});
function* feedOrdersFindWorker(action) {
    const { skip = 0, text = "", orderBy = "_id", status = "0" } = action.payload || {};
    yield put(actionOrdersFind({ skip, limit: 10, promiseName: "feedOrdersFind", text, orderBy, status }));
    yield delay(500);
}

const actionFeedUsersFind = ({ skip = 0, text = "", orderBy = "_id" }) => ({ type: "FEED_USERS_FIND", payload: { skip, text, orderBy } });
function* feedUsersFindWorker(action) {
    const { skip = 0, text = "", orderBy = "_id" } = action.payload || {};
    yield put(actionUsersFind({ skip, promiseName: "feedUsersFind", text, limit: 10, orderBy }));
    yield delay(500);
}

const actionFeedUsers = ({ skip = 0, orderBy = "_id" }) => ({ type: "FEED_USERS", payload: { skip, orderBy } });
function* feedUsersWorker(action) {
    const { skip = 0, orderBy = "_id" } = action.payload || {};
    yield put(actionUsersAll({ promiseName: "feedUsersAll", skip, limit: 10, orderBy }));
    yield delay(500);
}

export function* feedWatcher() {
    yield takeLeading("FEED_GOODS", feedGoodsWorker);
    yield takeLeading("FEED_CATEGORY_GOODS", feedCategoryGoodsWorker);
    yield takeLeading("FEED_GOODS_FIND", feedGoodsFindWorker);
    yield takeLeading("FEED_CATS_FIND", feedCatsFindWorker);
    yield takeLeading("FEED_CATS", feedCatsWorker);
    yield takeLeading("FEED_ORDERS", feedOrdersWorker);
    yield takeLeading("FEED_ORDERS_FIND", feedOrdersFindWorker);
    yield takeLeading("FEED_USERS_FIND", feedUsersFindWorker);
    yield takeLeading("FEED_USERS", feedUsersWorker);
}

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
