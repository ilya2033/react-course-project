import { actionPromise } from '../reducers';
import { gql } from '../helpers';

export const actionOrdersAll =
    ({ limit = 0, skip = 0, promiseName = 'adminOrdersAll' } = {}) =>
    async (dispatch, getState) => {
        dispatch(
            actionPromise(
                promiseName,
                new Promise((resolve) => {
                    setTimeout(
                        Math.random() > 0.01
                            ? resolve({
                                  data: [
                                      {
                                          _id: 1,
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
                                                      images: [
                                                          {
                                                              _id: 1,
                                                              url: 'https://content2.rozetka.com.ua/goods/images/big/183546719.jpg',
                                                          },
                                                          {
                                                              _id: 2,
                                                              url: 'https://content2.rozetka.com.ua/goods/images/big/183546719.jpg',
                                                          },
                                                      ],
                                                  },
                                              },
                                          ],
                                          price: 999,
                                          status: 1,
                                      },
                                      {
                                          _id: 2,
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
                                                      images: [
                                                          {
                                                              _id: 1,
                                                              url: 'https://content2.rozetka.com.ua/goods/images/big/183546719.jpg',
                                                          },
                                                          {
                                                              _id: 2,
                                                              url: 'https://content2.rozetka.com.ua/goods/images/big/183546719.jpg',
                                                          },
                                                      ],
                                                  },
                                              },
                                          ],
                                          price: 999,
                                          status: 2,
                                      },
                                      {
                                          _id: 3,
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
                                                      images: [
                                                          {
                                                              _id: 1,
                                                              url: 'https://content2.rozetka.com.ua/goods/images/big/183546719.jpg',
                                                          },
                                                          {
                                                              _id: 2,
                                                              url: 'https://content2.rozetka.com.ua/goods/images/big/183546719.jpg',
                                                          },
                                                      ],
                                                  },
                                              },
                                          ],
                                          price: 999,
                                          status: 3,
                                      },
                                      {
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
                                                      images: [
                                                          {
                                                              _id: 1,
                                                              url: 'https://content2.rozetka.com.ua/goods/images/big/183546719.jpg',
                                                          },
                                                          {
                                                              _id: 2,
                                                              url: 'https://content2.rozetka.com.ua/goods/images/big/183546719.jpg',
                                                          },
                                                      ],
                                                  },
                                              },
                                          ],
                                          price: 999,
                                          status: 4,
                                      },
                                  ],
                              })
                            : resolve({
                                  errors: [{ message: 'Error adsasdadas' }],
                              }),
                        400
                    );
                }).then((data) => {
                    if (data.errors) {
                        throw new Error(JSON.stringify(data.errors));
                    } else return data.data;
                })
            )
        );
    };
