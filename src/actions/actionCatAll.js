import { actionPromise } from '../reducers';
import { gql } from '../helpers';

export const actionCatAll =
    ({ limit = 0, skip = 0, promiseName = 'catAll' } = {}) =>
    async (dispatch, getState) => {
        dispatch(
            actionPromise(
                promiseName,
                fetch(`/categories/?limit=${limit}&skip=${skip}`, {
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
