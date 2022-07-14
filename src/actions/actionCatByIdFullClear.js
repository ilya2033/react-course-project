import { actionFeedClear, actionPromiseClear } from "../reducers";
import { actionCatById } from "./actionCatById";

export const actionCatByIdFullClear = () => async (dispatch, getState) => {
    dispatch(actionPromiseClear("catById"));
    dispatch(actionFeedClear());
    dispatch(actionPromiseClear("feedCategoryGoods"));
};
