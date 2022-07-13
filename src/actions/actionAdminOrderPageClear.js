import { actionPromiseClear } from "../reducers";

export const actionAdminOrderPageClear = () => async (dispatch, getState) => {
    dispatch(actionPromiseClear("usersAll"));
    dispatch(actionPromiseClear("goodsAll"));
    dispatch(actionPromiseClear("adminOrderById"));
    dispatch(actionPromiseClear("orderUpsert"));
};
