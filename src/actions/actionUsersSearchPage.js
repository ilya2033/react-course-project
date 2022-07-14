import { actionFeedClear, actionFeedUsersFind, actionPromiseClear } from "../reducers";

export const actionUsersSearchPage =
    ({ orderBy = "_id", text = "" } = {}) =>
    async (dispatch, getState) => {
        dispatch(actionFeedClear());
        dispatch(actionPromiseClear("feedUsersFind"));
        dispatch(actionFeedUsersFind({ skip: 0, orderBy, text }));
    };
