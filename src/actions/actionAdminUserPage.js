import { actionPromiseClear } from "../reducers";
import { actionCatAll } from "./actionCatAll";
import { actionCatById } from "./actionCatById";
import { actionGoodsAll } from "./actionGoodsAll";
import { actionUserById } from "./actionUserById";

export const actionAdminUserPage =
    ({ _id }) =>
    async (dispatch, getState) => {
        dispatch(actionPromiseClear("uploadFile"));
        if (_id) {
            dispatch(actionUserById({ _id, promiseName: "adminUserById" }));
        } else {
            dispatch(actionPromiseClear("adminUserById"));
        }
    };
