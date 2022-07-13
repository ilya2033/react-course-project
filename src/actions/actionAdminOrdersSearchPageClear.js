import { actionFeedClear, actionPromiseClear } from "../reducers";

export const actionAdminOrdersSearchPageClear = () => async (dispatch, getState) => {
    dispatch(actionFeedClear());
    dispatch(actionPromiseClear("feedOrdersFind"));
};
