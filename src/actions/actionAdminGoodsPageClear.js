import { actionFeedClear, actionPromiseClear } from "../reducers";

export const actionAdminGoodsPageClear = () => async (dispatch, getState) => {
    dispatch(actionFeedClear());
    dispatch(actionPromiseClear("feedGoodsAll"));
    dispatch(actionPromiseClear("goodUpsert"));
};
