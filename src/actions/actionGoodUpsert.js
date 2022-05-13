import { actionPromise } from '../reducers';

export const actionGoodUpsert = (good) => async (dispatch) => {
    dispatch(
        actionPromise(
            'goodUpsert',
            new Promise((resolve) => {
                setTimeout(
                    Math.random() > 0.01
                        ? resolve({
                              data: {
                                  _id: 1,
                                  name: 'Good 1',
                                  description: 'adaadasda asasd asd asd asd asd ',
                                  price: '999',
                                  amount: 9999,
                                  images: [
                                      { url: 'https://content2.rozetka.com.ua/goods/images/big/183546719.jpg' },
                                      { url: 'https://content2.rozetka.com.ua/goods/images/big/183546719.jpg' },
                                  ],
                              },
                          })
                        : resolve({
                              errors: [{ message: 'Error adsasdadas' }],
                          }),
                    400
                );
            })
        )
    );
};
