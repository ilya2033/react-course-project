import { actionOrdersAll } from './actionOrdersAll';
import { actionOrderUpsert } from './actionOrderUpsert';

export const actionOrderUpdate = (good) => async (dispatch, getState) => {
    await dispatch(actionOrderUpsert(good));
    await dispatch(actionOrdersAll());
};
