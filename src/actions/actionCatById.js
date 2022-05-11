import { mock, query } from '../helpers';

import { actionPromise } from '../reducers';

export const actionCatById = (_id) => async (dispatch, getState) => {
    dispatch(
        actionPromise(
            'catById',
            new Promise((resolve) => {
                setTimeout(
                    Math.random() > 0.01
                        ? resolve({
                              data: {
                                  _id: 1,
                                  name: 'Category 1',
                                  subcategories: [
                                      { _id: 11, name: 'Category 1' },
                                      { _id: 12, name: 'Category 1' },
                                  ],
                                  goods: [
                                      {
                                          _id: 1,
                                          name: 'Good 1',
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
                                      {
                                          _id: 2,
                                          name: 'Good 2',
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
                                      {
                                          _id: 3,
                                          name: 'Good 3',
                                          description: 'adaadasda asasd asd asd asd asd ',
                                          price: '999',
                                          images: null,
                                      },
                                      {
                                          _id: 4,
                                          name: 'Good 4',
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
                                      {
                                          _id: 6,
                                          name: 'Good 5',
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
                                      {
                                          id: 6,
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
