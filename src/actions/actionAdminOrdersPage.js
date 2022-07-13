import { actionFeedCats, actionFeedClear, actionFeedOrders, actionPromiseClear } from "../reducers";

export const actionAdminOrdersPage =
    ({ orderBy = "_id", status }) =>
    async (dispatch, getState) => {
        dispatch(actionFeedClear());
        dispatch(actionPromiseClear("feedOrdersAll"));
        dispatch(actionPromiseClear("orderUpsert"));
        dispatch(actionFeedOrders({ skip: 0, orderBy, status }));
    };
