import { actionPromiseClear } from "../reducers";
import { actionCatAll } from "./actionCatAll";
import { actionCatById } from "./actionCatById";
import { actionGoodsAll } from "./actionGoodsAll";

export const actionCategoryPage =
    ({ _id, promiseName = "catById" } = {}) =>
    async (dispatch, getState) => {
        dispatch(actionGoodsAll());
        dispatch(actionCatAll());

        if (_id) {
            dispatch(actionCatById({ _id, promiseName }));
        } else {
            dispatch(actionPromiseClear(promiseName));
        }
    };
