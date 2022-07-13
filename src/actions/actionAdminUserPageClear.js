import { actionPromiseClear } from "../reducers";

export const actionAdminCategoryPageClear = () => async (dispatch, getState) => {
    dispatch(actionPromiseClear("goodsAll"));
    dispatch(actionPromiseClear("adminCatById"));
    dispatch(actionPromiseClear("catAll"));
};
