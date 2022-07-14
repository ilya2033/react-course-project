import { actionFeedClear, actionPromiseClear } from "../reducers";

export const actionUsersPageClear = () => async (dispatch, getState) => {
    dispatch(actionFeedClear());
    dispatch(actionPromiseClear("feedUsersAll"));
};
