import { actionFeedClear, actionPromiseClear } from "../reducers";

export const actionAdminGoodsSearchPageClear = () => async (dispatch, getState) => {
    dispatch(actionFeedClear());
    dispatch(actionPromiseClear("feedGoodsFind"));
};
