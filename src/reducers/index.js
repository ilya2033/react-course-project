import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { authReducer, actionAuthLogin, actionAuthLogout } from "./authReducer";
import { promiseReducer, actionPending, actionFulfilled, actionRejected, actionPromise, actionPromiseClear } from "./promiseReducer";
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
export const store = createStore(
    combineReducers({
        auth: authReducer,
        promise: promiseReducer,
        cart: cartReducer,
        feed: feedReducer,
    }),
    composeWithDevTools(applyMiddleware(thunk))
);
