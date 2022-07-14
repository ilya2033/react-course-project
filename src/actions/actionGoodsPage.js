import { actionFeedClear, actionFeedGoods, actionPromiseClear } from "../reducers";

export const actionGoodsPage =
    ({ orderBy }) =>
    async (dispatch, getState) => {
        dispatch(actionFeedClear());
        dispatch(actionPromiseClear("feedGoodsAll"));
        dispatch(actionFeedGoods({ skip: 0, orderBy }));
    };
