import { actionPromiseClear } from "../reducers";
import { actionCatAll } from "./actionCatAll";
import { actionGoodById } from "./actionGoodById";

export const actionAdminGoodPage =
    ({ _id }) =>
    async (dispatch, getState) => {
        dispatch(actionCatAll());

        if (_id) {
            dispatch(actionGoodById({ _id, promiseName: "adminGoodById" }));
        } else {
            dispatch(actionPromiseClear("adminGoodById"));
        }
    };
