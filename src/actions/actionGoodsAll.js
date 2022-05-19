import { getQuery } from '../helpers';
import { actionPromise } from '../reducers';

export const actionGoodsAll =
    ({ limit = 0, skip = 0, promiseName = 'goodsAll' } = {}) =>
    async (dispatch, getState) => {
        dispatch(
            actionPromise(
                promiseName,
                fetch(`/goods/?limit=${limit}&skip=${skip}`, {
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
