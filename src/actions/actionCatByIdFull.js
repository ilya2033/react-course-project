import { actionFeedClear, actionPromiseClear } from "../reducers";
import { actionFeedCategoryGoods } from "../reducers/feedReducer";
import { actionCatById } from "./actionCatById";

export const actionCatByIdFull =
    ({ _id, orderBy }) =>
    async (dispatch, getState) => {
        const category = await dispatch(actionCatById({ _id }));
        dispatch(actionFeedClear());
        dispatch(actionPromiseClear("feedCategoryGoods"));
        dispatch(actionFeedCategoryGoods({ category, orderBy, skip: 0 }));
    };
