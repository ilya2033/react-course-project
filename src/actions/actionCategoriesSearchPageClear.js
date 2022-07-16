import { actionFeedClear, actionPromiseClear } from "../reducers";

export const actionCategoriesSearchPageClear = () => async (dispatch, getState) => {
    dispatch(actionFeedClear());
    dispatch(actionPromiseClear("feedCatsFind"));
};

const actions = {
    actionCategoriesSearchPageClear: "actionCategoriesSearchPageClear",
};
