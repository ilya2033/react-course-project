import { actionFeedClear, actionFeedUsers, actionPromiseClear } from "../reducers";

export const actionUsersPage =
    ({ orderBy = "_id" } = {}) =>
    async (dispatch, getState) => {
        dispatch(actionFeedClear());
        dispatch(actionPromiseClear("feedUsersAll"));
        dispatch(actionFeedUsers({ skip: 0, orderBy }));
    };
