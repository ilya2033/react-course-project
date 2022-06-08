import { backendURL, mock, query } from '../helpers';

import { actionPromise } from '../reducers';

export const actionCatById = ({ _id, promiseName = 'catById', orderBy = '', limit = 20, skip = 0 }) =>
    actionPromise(
        promiseName,
        fetch(`${backendURL}/categories/${_id}/?limit=${limit}&skip=${skip}${orderBy && `&orderBy=` + orderBy}`, {
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
