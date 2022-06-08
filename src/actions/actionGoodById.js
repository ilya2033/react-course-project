import { backendURL, getQuery, mock, query } from '../helpers';

import { actionPromise } from '../reducers';

export const actionGoodById = ({ _id, promiseName = 'goodById' } = {}) =>
    actionPromise(
        promiseName,
        fetch(`${backendURL}/goods/${_id}/`, {
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
