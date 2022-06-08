import { actionCatAll } from './actionCatAll';
import { actionGoodsPopular } from './actionGoodsPopular';
import { actionRootCats } from './actionRootCats';

export const actionPageStart = () => async (dispatch, getState) => {
    dispatch(actionRootCats());
    dispatch(actionCatAll());
    dispatch(actionGoodsPopular());
};