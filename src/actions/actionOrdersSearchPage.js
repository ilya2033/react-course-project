import { actionFeedCats, actionFeedCatsFind, actionFeedClear, actionFeedOrdersFind, actionPromiseClear } from "../reducers";

export const actionOrdersSearchPage =
    ({ orderBy = "_id", text, status } = {}) =>
    async (dispatch, getState) => {
        dispatch(actionFeedClear());
        dispatch(actionPromiseClear("feedOrdersFind"));
        dispatch(actionFeedOrdersFind({ text, orderBy, skip: 0, status }));
    };
