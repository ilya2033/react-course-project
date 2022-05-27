import { actionPromise } from '../reducers';
import { gql } from '../helpers';

export const actionOrdersAll =
    ({ limit = 0, skip = 0, promiseName = 'adminOrdersAll', orderBy = '' } = {}) =>
    async (dispatch, getState) => {
        dispatch(
            actionPromise(
                promiseName,
                fetch(`/orders/?limit=${limit}&skip=${skip}${orderBy && `&orderBy=` + orderBy}`, {
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
