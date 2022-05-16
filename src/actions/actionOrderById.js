import { mock, query } from '../helpers';

import { actionPromise } from '../reducers';

export const actionOrderById =
    ({ _id, promiseName = 'orderById' }) =>
    async (dispatch, getState) => {
        dispatch(
            actionPromise(
                promiseName,
                new Promise((resolve) => {
                    setTimeout(
                        Math.random() > 0.01
                            ? resolve({
                                  data: {
                                      _id: 4,
                                      email: 'example@gmail.com',
                                      phoneNumber: '0667213260',
                                      orderGoods: [
                                          {
                                              _id: 1,
                                              price: 999,
                                              count: 1,
                                              good: {
                                                  _id: 1,
                                                  name: 'Good 1',
                                                  price: '999',
                                              },
                                          },
                                      ],
                                      price: 999,
                                      status: 3,
                                  },
                              })
                            : resolve({
                                  errors: [{ message: 'Error adsasdadas' }],
                              }),
                        400
                    );
                })
                    // .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                        if (data.errors) {
                            throw new Error(JSON.stringify(data.errors));
                        } else return data.data;
                    })
            )
        );
    };
