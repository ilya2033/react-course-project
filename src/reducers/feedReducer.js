import { actionCatAll } from "../actions/actionCatAll";
import { actionGoodsFind } from "../actions/actionGoodsFind";
import { actionCatsFind } from "../actions/actionCatsFind";
import { actionGoodsAll } from "../actions/actionGoodsAll";
import { actionOrdersAll } from "../actions/actionOrdersAll";
import { actionOrdersFind } from "../actions/actionOrdersFind";
import { actionCategoryGoods } from "../actions/actionCategoryGoods";
import { actionUsersFind } from "../actions/actionUsersFind";
import { actionUsersAll } from "../actions/actionUsersAll";

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
const actionFeedGoods = ({ skip = 0, orderBy = "_id" }) => actionGoodsAll({ skip, limit: 10, promiseName: "feedGoodsAll", orderBy });

const actionFeedCategoryGoods = ({ skip = 0, orderBy = "_id", category }) =>
    actionCategoryGoods({ skip, limit: 10, promiseName: "feedCategoryGoods", orderBy, category });

const actionFeedGoodsFind = ({ skip = 0, text = "", orderBy = "_id" }) =>
    actionGoodsFind({ skip, limit: 10, promiseName: "feedGoodsFind", text, orderBy });

const actionFeedCatsFind = ({ skip = 0, text = "", orderBy = "_id" }) =>
    actionCatsFind({ skip, promiseName: "feedCatsFind", text, limit: 10, orderBy });

const actionFeedCats = ({ skip = 0, orderBy = "_id" }) => actionCatAll({ promiseName: "feedCatAll", skip, limit: 10, orderBy });

const actionFeedOrders = ({ skip = 0, orderBy = "_id", status = 0 }) =>
    actionOrdersAll({ skip, limit: 10, promiseName: "feedOrdersAll", orderBy, status });

const actionFeedOrdersFind = ({ skip = 0, text = "", orderBy = "_id", status = "0" }) =>
    actionOrdersFind({ skip, limit: 10, promiseName: "feedOrdersFind", text, orderBy, status });

const actionFeedUsersFind = ({ skip = 0, text = "", orderBy = "_id" }) =>
    actionUsersFind({ skip, promiseName: "feedUsersFind", text, limit: 10, orderBy });

const actionFeedUsers = ({ skip = 0, orderBy = "_id" }) => actionUsersAll({ promiseName: "feedUsersAll", skip, limit: 10, orderBy });

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
