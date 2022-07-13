import { actionFeedClear, actionFeedGoods, actionPromiseClear } from "../reducers";

export const actionAdminGoodsPage =
    ({ orderBy }) =>
    async (dispatch, getState) => {
        dispatch(actionFeedClear());
        dispatch(actionPromiseClear("feedGoodsAll"));
        dispatch(actionPromiseClear("goodUpsert"));
        dispatch(actionFeedGoods({ skip: 0, orderBy }));
    };
