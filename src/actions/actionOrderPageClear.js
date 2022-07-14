import { actionPromiseClear } from "../reducers";

export const actionOrderPageClear =
    ({ promiseName = "orderById" } = {}) =>
    async (dispatch, getState) => {
        dispatch(actionPromiseClear("usersAll"));
        dispatch(actionPromiseClear("goodsAll"));
        dispatch(actionPromiseClear(promiseName));
        dispatch(actionPromiseClear("orderUpsert"));
    };
