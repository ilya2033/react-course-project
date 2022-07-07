import { actionAboutMe } from "./actionAboutMe";
import { actionCatAll } from "./actionCatAll";
import { actionGoodsPopular } from "./actionGoodsPopular";
import { actionOrders } from "./actionOrders";
import { actionRootCats } from "./actionRootCats";

export const actionPageStart = () => async (dispatch, getState) => {
    dispatch(actionRootCats());
    dispatch(actionCatAll());
    dispatch(actionGoodsPopular());

    const {
        auth: { token },
    } = getState();

    if (token) {
        dispatch(actionAboutMe());
        dispatch(actionOrders());
    }
};
