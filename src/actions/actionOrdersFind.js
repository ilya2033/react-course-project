import { backendURL } from '../helpers';
import { actionPromise } from '../reducers';

export const actionOrdersFind =
    ({ text = '', limit = 7, skip = 0, promiseName = 'ordersFind', orderBy = '' }) =>
    async (dispatch, getState) => {
        dispatch(
            actionPromise(
                promiseName,
                fetch(
                    `${backendURL}/orders/?limit=${limit}&skip=${skip}&text=${text}${orderBy && `&orderBy=` + orderBy}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            ...(localStorage.authToken ? { Authorization: 'Bearer ' + localStorage.authToken } : {}),
                        },
                    }
                )
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.errors) {
                            throw new Error(JSON.stringify(data.errors));
                        } else return data.data;
                    })
            )
        );
    };
