import { mock, query } from '../helpers';

import { actionPromise } from '../reducers';

export const actionGoodById =
    ({ _id, promiseName = 'goodById' } = {}) =>
    async (dispatch, getState) => {
        dispatch(
            actionPromise(
                promiseName,
                new Promise((resolve) => {
                    setTimeout(
                        Math.random() > 0.01
                            ? resolve({
                                  data: {
                                      _id: 6,
                                      name: 'Good 6',
                                      description: 'adaadasda asasd asd asd asd asd ',
                                      price: '999',
                                      images: [
                                          {
                                              url: 'https://content2.rozetka.com.ua/goods/images/big/183546719.jpg',
                                          },
                                          {
                                              url: 'https://content2.rozetka.com.ua/goods/images/big/183546719.jpg',
                                          },
                                      ],
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
