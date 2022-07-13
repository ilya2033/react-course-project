import { actionFeedClear, actionPromiseClear } from "../reducers";

export const actionAdminOrdersPageClear = () => async (dispatch, getState) => {
    dispatch(actionFeedClear());
    dispatch(actionPromiseClear("feedOrdersAll"));
    dispatch(actionPromiseClear("orderUpsert"));
};
