import { actionCatAll } from "./actionCatAll";
import { actionCategoryUpsert } from "./actionCategoryUpsert";

export const actionCategoryUpdate = (category) => async (dispatch, getState) => {
  await dispatch(actionCategoryUpsert(category));
  await dispatch(actionCatAll());
};
