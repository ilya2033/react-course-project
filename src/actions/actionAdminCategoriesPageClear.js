import { actionFeedClear, actionPromiseClear } from "../reducers";

export const actionAdminCategoriesPageClear = () => async (dispatch, getState) => {
    dispatch(actionFeedClear());
    dispatch(actionPromiseClear("feedCatAll"));
    dispatch(actionPromiseClear("categoryUpsert"));
};
