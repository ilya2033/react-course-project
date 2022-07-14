import { actionFeedCats, actionFeedClear, actionFeedOrders, actionPromiseClear } from "../reducers";

export const actionOrdersPage =
    ({ orderBy = "_id", status = "0" } = {}) =>
    async (dispatch, getState) => {
        dispatch(actionFeedClear());
        dispatch(actionPromiseClear("feedOrdersAll"));
        dispatch(actionFeedOrders({ skip: 0, orderBy, status }));
    };
