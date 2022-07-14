import { actionFeedClear, actionPromiseClear } from "../reducers";

export const actionOrdersSearchPageClear = () => async (dispatch, getState) => {
    dispatch(actionFeedClear());
    dispatch(actionPromiseClear("feedOrdersFind"));
};
