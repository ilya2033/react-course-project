import { actionPromise } from '../reducers';

export const actionOrderUpsert = (order) => async (dispatch) => {
    dispatch(
        actionPromise(
            'orderUpsert',
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
        )
    );
};
