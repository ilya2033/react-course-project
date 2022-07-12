import { actionFeedClear, actionPromiseClear } from "../reducers";

export const actionAdminCategoriesSearchPageClear = () => async (dispatch, getState) => {
    dispatch(actionFeedClear());
    dispatch(actionPromiseClear("feedCatsFind"));
};
