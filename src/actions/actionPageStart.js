import { actionGoodsPopular } from './actionGoodsPopular';
import { actionRootCats } from './actionRootCats';

export const actionPageStart = () => async (dispatch, getState) => {
    dispatch(actionRootCats());
    dispatch(actionGoodsPopular());

    // const {
    //     auth: { token },
    // } = getState();

    // if (token) {
    //     dispatch(actionAboutMe());
    // }
};
