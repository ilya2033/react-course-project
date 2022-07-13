import { actionFeedCats, actionFeedCatsFind, actionFeedClear, actionFeedGoodsFind, actionPromiseClear } from "../reducers";

export const actionAdminGoodsSearchPage =
    ({ orderBy = "_id", text }) =>
    async (dispatch, getState) => {
        dispatch(actionFeedClear());
        dispatch(actionPromiseClear("feedGoodsFind"));
        dispatch(actionFeedGoodsFind({ text, orderBy, skip: 0 }));
    };
