import { actionPromiseClear } from "../reducers";
import { actionGoodsAll } from "./actionGoodsAll";
import { actionOrderById } from "./actionOrderById";
import { actionUsersAll } from "./actionUsersAll";

export const actionOrderPage =
    ({ _id, promiseName = "orderById" } = {}) =>
    async (dispatch, getState) => {
        dispatch(actionUsersAll());
        dispatch(actionGoodsAll());

        if (_id) {
            dispatch(actionOrderById({ _id, promiseName }));
        } else {
            dispatch(actionPromiseClear(promiseName));
        }
    };
