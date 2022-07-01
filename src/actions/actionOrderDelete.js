import { backendURL, getQuery, mock, query } from '../helpers';

import { actionPromise } from '../reducers';

export const actionOrderDelete = ({ _id, promiseName = 'orderDelete' } = {}) =>
    actionPromise(
        promiseName,
        fetch(`${backendURL}/order/${_id}/delete/`, {
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
