import { actionPromiseClear } from "../reducers";
import { actionGoodsAll } from "./actionGoodsAll";
import { actionOrderById } from "./actionOrderById";
import { actionUsersAll } from "./actionUsersAll";

export const actionAdminOrderPage =
    ({ _id }) =>
    async (dispatch, getState) => {
        dispatch(actionUsersAll());
        dispatch(actionGoodsAll());

        if (_id) {
            dispatch(actionOrderById({ _id, promiseName: "adminOrderById" }));
        } else {
            dispatch(actionPromiseClear("adminOrderById"));
        }
    };
