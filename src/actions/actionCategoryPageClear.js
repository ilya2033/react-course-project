import { actionPromiseClear } from "../reducers";

export const actionCategoryPageClear =
    ({ promiseName = "catById" } = {}) =>
    async (dispatch, getState) => {
        dispatch(actionPromiseClear("goodsAll"));
        dispatch(actionPromiseClear(promiseName));
        dispatch(actionPromiseClear("catAll"));
    };
