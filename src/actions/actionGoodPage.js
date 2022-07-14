import { actionPromiseClear } from "../reducers";
import { actionCatAll } from "./actionCatAll";
import { actionGoodById } from "./actionGoodById";

export const actionGoodPage =
    ({ _id, promiseName = "goodById" } = {}) =>
    async (dispatch, getState) => {
        dispatch(actionCatAll());

        if (_id) {
            dispatch(actionGoodById({ _id, promiseName }));
        } else {
            dispatch(actionPromiseClear(promiseName));
        }
    };
