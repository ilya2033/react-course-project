import { actionFeedClear, actionPromiseClear } from "../reducers";

export const actionAdminUsersPageClear = () => async (dispatch, getState) => {
    dispatch(actionFeedClear());
    dispatch(actionPromiseClear("feedUsersAll"));
    dispatch(actionPromiseClear("userUpsert"));
};
