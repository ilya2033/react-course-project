import { actionPromiseClear } from "../reducers";

export const actionUserPageClear =
    ({ promiseName = "userById" } = {}) =>
    async (dispatch, getState) => {
        dispatch(actionPromiseClear(promiseName));
        dispatch(actionPromiseClear("uploadFile"));
    };
