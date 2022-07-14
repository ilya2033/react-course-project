import { actionFeedClear, actionPromiseClear } from "../reducers";

export const actionUsersSearchPageClear = () => async (dispatch, getState) => {
    dispatch(actionFeedClear());
    dispatch(actionPromiseClear("feedUsersFind"));
};
