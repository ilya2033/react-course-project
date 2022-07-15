import { createStore, combineReducers, applyMiddleware } from "redux";
import { all, put, takeEvery, takeLatest, takeLeading, select } from "redux-saga/effects";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { authReducer, actionAuthLogin, actionAuthLogout } from "./authReducer";
import {
    promiseReducer,
    actionPending,
    actionFulfilled,
    actionRejected,
    actionPromise,
    actionPromiseClear,
    promiseWatcher,
} from "./promiseReducer";
import { cartReducer, actionCartAdd, actionCartChange, actionCartDelete, actionCartClear } from "./cartReducer";
import {
    actionFeedCats,
    actionFeedCatsFind,
    actionFeedGoods,
    actionFeedGoodsFind,
    actionFeedClear,
    actionFeedAdd,
    actionFeedOrdersFind,
    actionFeedOrders,
    feedReducer,
    actionFeedUsers,
    actionFeedUsersFind,
    feedWatcher,
} from "./feedReducer";

export { cartReducer, actionCartAdd, actionCartChange, actionCartDelete, actionCartClear };
export { authReducer, actionAuthLogin, actionAuthLogout };
export { promiseReducer, actionPending, actionFulfilled, actionRejected, actionPromise, actionPromiseClear };
export {
    actionFeedCats,
    actionFeedCatsFind,
    actionFeedGoods,
    actionFeedGoodsFind,
    actionFeedClear,
    actionFeedAdd,
    actionFeedOrdersFind,
    actionFeedOrders,
    actionFeedUsers,
    actionFeedUsersFind,
    feedReducer,
};

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
    combineReducers({
        auth: authReducer,
        promise: promiseReducer,
        cart: cartReducer,
        feed: feedReducer,
    }),
    applyMiddleware(sagaMiddleware)
);

function* rootSaga() {
    yield all([promiseWatcher(), feedWatcher()]);
}

sagaMiddleware.run(rootSaga);
