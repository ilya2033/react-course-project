import { actionPromiseClear } from "../reducers";

export const actionGoodPageClear =
    ({ promiseName = "goodById" } = {}) =>
    async (dispatch, getState) => {
        dispatch(actionPromiseClear(promiseName));
        dispatch(actionPromiseClear("goodsAll"));
        dispatch(actionPromiseClear("goodUpsert"));
    };
