import { gql } from "../helpers";
import { actionPromise, actionPromiseClear } from "../reducers";
import { actionCatAll } from "./actionCatAll";
import { actionCatById } from "./actionCatById";
import { actionGoodsAll } from "./actionGoodsAll";

export const actionAdminCategoryPageClear = () => async (dispatch, getState) => {
    dispatch(actionPromiseClear("goodsAll"));
    dispatch(actionPromiseClear("adminCatById"));
    dispatch(actionPromiseClear("catAll"));
};
