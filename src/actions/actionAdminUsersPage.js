import { actionFeedCats, actionFeedClear, actionFeedUsers, actionPromiseClear } from "../reducers";

export const actionAdminUsersPage =
    ({ orderBy = "_id" }) =>
    async (dispatch, getState) => {
        dispatch(actionFeedClear());
        dispatch(actionPromiseClear("feedUsersAll"));
        dispatch(actionFeedUsers({ skip: 0, orderBy }));
    };
