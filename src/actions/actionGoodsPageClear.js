import { actionFeedClear, actionPromiseClear } from "../reducers";

export const actionGoodsPageClear = () => async (dispatch, getState) => {
    dispatch(actionFeedClear());
    dispatch(actionPromiseClear("feedGoodsAll"));
    dispatch(actionPromiseClear("goodUpsert"));
};
