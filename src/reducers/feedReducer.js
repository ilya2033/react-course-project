import { actionPromise } from '.';
import { actionCatAll } from '../actions/actionCatAll';
import { actionGoodsFind } from '../actions/actionGoodsFind';
import { actionCatsFind } from '../actions/actionCatsFind';
import { actionGoodsAll } from '../actions/actionGoodsAll';
import { gql } from '../helpers';

function feedReducer(state = { payload: [] }, { type, payload = [] }) {
    if (type === 'FEED_ADD') {
        return {
            ...state,
            payload: [...state['payload'], ...payload],
        };
    }

    if (type === 'FEED_CLEAR') {
        return { payload: [] };
    }
    return state || { payload: [] };
}

const actionFeedAdd = (payload) => ({ type: 'FEED_ADD', payload });
const actionFeedClear = () => ({ type: 'FEED_CLEAR' });
const actionFeedGoods =
    (skip = 0) =>
    async (dispatch, getState) => {
        await dispatch(actionGoodsAll({ skip, limit: 50, promiseName: 'feedGoodsAll' }));
    };

const actionFeedGoodsFind =
    ({ skip = 0, text = '' }) =>
    async (dispatch, getState) => {
        await dispatch(actionGoodsFind({ skip, limit: 50, promiseName: 'feedGoodsFind', text }));
    };

const actionFeedCatsFind =
    ({ skip = 0, text = '' }) =>
    async (dispatch, getState) => {
        await dispatch(actionCatsFind({ skip, promiseName: 'feedCatsFind', text, limit: 50 }));
    };

const actionFeedCats =
    (skip = 0) =>
    async (dispatch, getState) => {
        await dispatch(actionCatAll({ promiseName: 'feedCatAll', skip, limit: 50 }));
    };

export {
    actionFeedCats,
    actionFeedCatsFind,
    actionFeedGoods,
    actionFeedClear,
    actionFeedAdd,
    actionFeedGoodsFind,
    feedReducer,
};
