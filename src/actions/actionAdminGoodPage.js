import { actionPromiseClear } from "../reducers";
import { actionCatAll } from "./actionCatAll";
import { actionCatById } from "./actionCatById";
import { actionGoodById } from "./actionGoodById";
import { actionGoodsAll } from "./actionGoodsAll";

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
