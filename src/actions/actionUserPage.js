import { actionPromiseClear } from "../reducers";
import { actionUserById } from "./actionUserById";

export const actionUserPage =
    ({ _id, promiseName = "userById" } = {}) =>
    async (dispatch, getState) => {
        dispatch(actionPromiseClear("uploadFile"));
        if (_id) {
            dispatch(actionUserById({ _id, promiseName }));
        } else {
            dispatch(actionPromiseClear(promiseName));
        }
    };
