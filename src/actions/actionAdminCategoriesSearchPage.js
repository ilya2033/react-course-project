import { actionFeedCats, actionFeedCatsFind, actionFeedClear, actionPromiseClear } from "../reducers";

export const actionAdminCategoriesSearchPage =
    ({ orderBy = "_id", text }) =>
    async (dispatch, getState) => {
        dispatch(actionFeedClear());
        dispatch(actionPromiseClear("feedCatsFind"));
        dispatch(actionFeedCatsFind({ text, orderBy, skip: 0 }));
    };
