import { actionCatAll } from "./actionCatAll";
import { actionCategoryUpsert } from "./actionCategoryUpsert";

export const actionCategoryUpdate = (good) => async (dispatch, getState) => {
  await dispatch(actionCategoryUpsert(good));
  await dispatch(actionCatAll());
};
