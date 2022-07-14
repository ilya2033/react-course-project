import { actionFeedClear, actionPromiseClear } from "../reducers";

export const actionCategoriesPageClear = () => async (dispatch, getState) => {
    dispatch(actionFeedClear());
    dispatch(actionPromiseClear("feedCatAll"));
};
