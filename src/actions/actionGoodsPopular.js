import { backendURL, mock, query } from '../helpers';

import { actionPromise } from '../reducers';

export const actionGoodsPopular = () => async (dispatch, getState) => {
    dispatch(
        actionPromise(
            'goodsPopular',
            fetch(`${backendURL}/goods/?limit=20&skip=0&popular=1`, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
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
