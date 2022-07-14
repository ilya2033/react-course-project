import { actionFeedCatsFind, actionFeedClear, actionPromiseClear } from "../reducers";

export const actionCategoriesSearchPage =
    ({ orderBy = "_id", text = "" } = {}) =>
    async (dispatch, getState) => {
        dispatch(actionFeedClear());
        dispatch(actionPromiseClear("feedCatsFind"));
        dispatch(actionFeedCatsFind({ text, orderBy, skip: 0 }));
    };
