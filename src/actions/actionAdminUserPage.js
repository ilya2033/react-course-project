import { actionPromiseClear } from "../reducers";
import { actionCatAll } from "./actionCatAll";
import { actionCatById } from "./actionCatById";
import { actionGoodsAll } from "./actionGoodsAll";

export const actionAdminCategoryPage =
    ({ _id }) =>
    async (dispatch, getState) => {
        dispatch(actionGoodsAll());
        dispatch(actionCatAll());

        if (_id) {
            dispatch(actionCatById({ _id, promiseName: "adminCatById" }));
        } else {
            dispatch(actionPromiseClear("adminCatById"));
        }
    };
