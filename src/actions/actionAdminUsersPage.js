import { actionFeedCats, actionFeedClear, actionPromiseClear } from "../reducers";

export const actionAdminCategoriesPage =
    ({ orderBy = "_id" }) =>
    async (dispatch, getState) => {
        dispatch(actionFeedClear());
        dispatch(actionPromiseClear("feedCatAll"));
        dispatch(actionPromiseClear("categoryUpsert"));
        dispatch(actionFeedCats({ skip: 0, orderBy }));
    };
