import { actionGoodsAll } from "./actionGoodsAll";
import { actionGoodUpsert } from "./actionGoodUpsert";

export const actionGoodUpdate = (good) => async (dispatch, getState) => {
    await dispatch(actionGoodUpsert(good));
    await dispatch(actionGoodsAll());
};
