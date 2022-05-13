import { actionPromise } from '../reducers';

export const actionGoodsAll =
    ({ limit = 0, skip = 0, promiseName = 'goodsAll' } = {}) =>
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
                                          name: 'Good 1',
                                          description: 'adaadasda asasd asd asd asd asd ',
                                          price: '999',
                                          amount: 9999,
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
                                          categories: [{ _id: 1, name: 'Category 1' }],
                                      },
                                      {
                                          _id: 2,
                                          name: 'Good 2',
                                          description: 'adaadasda asasd asd asd asd asd ',
                                          price: '999',
                                          amount: 9999,
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
                                          categories: [{ _id: 1, name: 'Category 1' }],
                                      },
                                      {
                                          _id: 3,
                                          name: 'Good 3',
                                          description: 'adaadasda asasd asd asd asd asd ',
                                          price: '999',
                                          amount: 9999,
                                          images: null,
                                          categories: [{ _id: 1, name: 'Category 1' }],
                                      },
                                      {
                                          _id: 4,
                                          name: 'Good 4',
                                          description: 'adaadasda asasd asd asd asd asd ',
                                          price: '999',
                                          amount: 9999,
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
                                          categories: [
                                              { _id: 1, name: 'Category 1' },
                                              { _id: 1, name: 'Category 2' },
                                          ],
                                      },
                                      {
                                          _id: 5,
                                          name: 'Good 5',
                                          description: 'adaadasda asasd asd asd asd asd ',
                                          price: '999',
                                          amount: 9999,
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
                                          categories: [{ _id: 1, name: 'Category 1' }],
                                      },
                                      {
                                          _id: 6,
                                          name: 'Good 6',
                                          description: 'adaadasda asasd asd asd asd asd ',
                                          price: '999',
                                          amount: 9999,
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
                                          categories: [{ _id: 1, name: 'Category 1' }],
                                      },
                                  ],
                              })
                            : resolve({
                                  errors: [{ message: 'Error adsasdadas' }],
                              }),
                        400
                    );
                }).then((data) => {
                    console.log(data);
                    if (data.errors) {
                        throw new Error(JSON.stringify(data.errors));
                    } else return data.data;
                })
            )
        );
    };
