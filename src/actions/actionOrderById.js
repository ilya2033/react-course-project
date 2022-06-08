import { backendURL, mock, query } from '../helpers';

import { actionPromise } from '../reducers';

export const actionOrderById = ({ _id, promiseName = 'orderById' }) =>
    actionPromise(
        promiseName,
        fetch(`${backendURL}/orders/${_id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',

                ...(localStorage.authToken ? { Authorization: 'Bearer ' + localStorage.authToken } : {}),
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.errors) {
                    throw new Error(JSON.stringify(data.errors));
                } else return data.data;
            })
    );
