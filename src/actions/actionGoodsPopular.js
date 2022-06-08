import { mock, query } from '../helpers';

import { actionPromise } from '../reducers';

export const actionGoodsPopular = () => async (dispatch, getState) => {
    dispatch(
        actionPromise(
            'goodsPopular',
            fetch(`/goods/?limit=20&skip=0&popular=1`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...(localStorage.authToken ? { Authorization: 'Bearer ' + localStorage.authToken } : {}),
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.errors) {
                        throw new Error(JSON.stringify(data.errors));
                    } else return data.data;
                })
        )
    );
};
