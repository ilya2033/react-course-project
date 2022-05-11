import { mock, query } from '../helpers';

import { actionPromise } from '../reducers';

export const actionNewOrder = () => async (dispatch, getState) => {
    dispatch(
        actionPromise(
            'newOrder',
            new Promise((resolve) => {
                setTimeout(
                    Math.random() > 0.01
                        ? resolve({
                              data: { _id: '12313' },
                          })
                        : resolve({
                              errors: [{ message: 'Error adsasdadas' }],
                          }),
                    400
                );
            })
                // .then((res) => res.json())
                .then((data) => {
                    if (data.errors) {
                        throw new Error(JSON.stringify(data.errors));
                    } else return Object.values(data.data);
                })
        )
    );
};
