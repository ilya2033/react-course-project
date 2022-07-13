import { actionFeedClear, actionPromiseClear } from "../reducers";

export const actionAdminUsersSearchPageClear = () => async (dispatch, getState) => {
    dispatch(actionFeedClear());
    dispatch(actionPromiseClear("feedUsersFind"));
};
