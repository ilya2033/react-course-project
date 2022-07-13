import { actionPromiseClear } from "../reducers";

export const actionAdminGoodPageClear = () => async (dispatch, getState) => {
    dispatch(actionPromiseClear("adminGoodById"));
    dispatch(actionPromiseClear("goodsAll"));
    dispatch(actionPromiseClear("goodUpsert"));
};
