import { actionPromise } from '../reducers';

export const actionCatsFind =
    ({ text = '', limit = 0, skip = 0, promiseName = 'catsFind' }) =>
    async (dispatch, getState) => {
        await dispatch(
            actionPromise(
                promiseName,
                new Promise((resolve) => {
                    setTimeout(
                        Math.random() > 0.01
                            ? resolve({
                                  data: [
                                      {
                                          _id: 1,
                                          name: 'Category 1',
                                      },
                                      {
                                          _id: 2,
                                          name: 'Category 2',
                                      },
                                      {
                                          _id: 3,
                                          name: 'Category 3',
                                      },
                                      {
                                          _id: 4,
                                          name: 'Category 4',
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
