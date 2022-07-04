import { actionCartClear, actionPromiseClear } from "../reducers";
import { actionAuthLogout } from "../reducers";

export const actionLogout = () => async (dispatch) => {
  dispatch(actionCartClear());
  dispatch(actionAuthLogout());
  dispatch(actionPromiseClear("aboutMe"));
};
