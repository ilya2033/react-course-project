import { actionPromiseClear } from "../reducers";

export const actionAdminUserPageClear = () => async (dispatch, getState) => {
    dispatch(actionPromiseClear("adminUserById"));
    dispatch(actionPromiseClear("uploadFile"));
};
