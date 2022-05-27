import { actionPromise } from '.';
import { actionCatAll } from '../actions/actionCatAll';
import { actionGoodsFind } from '../actions/actionGoodsFind';
import { actionCatsFind } from '../actions/actionCatsFind';
import { actionGoodsAll } from '../actions/actionGoodsAll';
import { gql } from '../helpers';
import { actionOrdersAll } from '../actions/actionOrdersAll';
import { actionOrdersFind } from '../actions/actionOrdersFind';

function feedReducer(state = { payload: [] }, { type, payload = [] }) {
    if (type === 'FEED_ADD') {
        return {
            ...state,
            payload: [...new Map([...state['payload'], ...payload].map((item) => [item['_id'], item])).values()],
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
    ({ skip = 0, orderBy = '_id' }) =>
    async (dispatch, getState) => {
        await dispatch(actionGoodsAll({ skip, limit: 20, promiseName: 'feedGoodsAll', orderBy }));
    };

const actionFeedGoodsFind =
    ({ skip = 0, text = '' }) =>
    async (dispatch, getState) => {
        await dispatch(actionGoodsFind({ skip, limit: 20, promiseName: 'feedGoodsFind', text }));
    };

const actionFeedCatsFind =
    ({ skip = 0, text = '' }) =>
    async (dispatch, getState) => {
        await dispatch(actionCatsFind({ skip, promiseName: 'feedCatsFind', text, limit: 7 }));
    };

const actionFeedCats =
    ({ skip = 0, orderBy = '_id' }) =>
    async (dispatch, getState) => {
        await dispatch(actionCatAll({ promiseName: 'feedCatAll', skip, limit: 20, orderBy }));
    };

const actionFeedOrders =
    ({ skip = 0, orderBy = '_id' }) =>
    async (dispatch, getState) => {
        await dispatch(actionOrdersAll({ skip, limit: 20, promiseName: 'feedOrdersAll', orderBy }));
    };

const actionFeedOrdersFind =
    ({ skip = 0, text = '' }) =>
    async (dispatch, getState) => {
        await dispatch(actionOrdersFind({ skip, limit: 20, promiseName: 'feedOrdersFind', text }));
    };

export {
    actionFeedCats,
    actionFeedCatsFind,
    actionFeedGoods,
    actionFeedClear,
    actionFeedAdd,
    actionFeedGoodsFind,
    feedReducer,
    actionFeedOrders,
    actionFeedOrdersFind,
};
