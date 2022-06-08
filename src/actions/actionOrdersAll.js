import { actionPromise } from '../reducers';
import { gql } from '../helpers';

export const actionOrdersAll =
    ({ limit = 0, skip = 0, promiseName = 'adminOrdersAll', orderBy = '', status = 0 } = {}) =>
    async (dispatch, getState) => {
        console.log(status);
        dispatch(
            actionPromise(
                promiseName,
                fetch(
                    `/orders/?limit=${limit}&skip=${skip}${orderBy && `&orderBy=` + orderBy}${
                        status ? `&status=` + status : ''
                    }`,
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
