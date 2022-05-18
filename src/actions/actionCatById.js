import { mock, query } from '../helpers';

import { actionPromise } from '../reducers';

export const actionCatById = ({ _id, promiseName = 'catById' }) =>
    actionPromise(
        promiseName,
        fetch(`/categories/${_id}/`, {
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
