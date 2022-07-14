import { actionFeedClear, actionPromiseClear } from "../reducers";

export const actionOrdersPageClear = () => async (dispatch, getState) => {
    dispatch(actionFeedClear());
    dispatch(actionPromiseClear("feedOrdersAll"));
};
