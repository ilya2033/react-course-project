import { actionFeedClear, actionFeedGoods, actionPromiseClear } from "../reducers";

export const actionAdminGoodsPageClear =
    ({ orderBy }) =>
    async (dispatch, getState) => {
        dispatch(actionFeedClear());
        dispatch(actionPromiseClear("feedGoodsAll"));
        dispatch(actionPromiseClear("goodUpsert"));
    };
