import { actionFeedClear, actionPromiseClear } from "../reducers";

export const actionGoodsSearchPageClear = () => async (dispatch, getState) => {
    dispatch(actionFeedClear());
    dispatch(actionPromiseClear("feedGoodsFind"));
};
