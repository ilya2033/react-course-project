import { actionPromise } from '../reducers';
import { gql } from '../helpers';

export const actionCatAll =
    ({ limit = 0, skip = 0, promiseName = 'catAll' } = {}) =>
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
                                          parent: null,
                                          subcategories: [5, 6],
                                          goods: [1, 2],
                                          name: 'Category 1',
                                      },
                                      {
                                          _id: 2,
                                          parent: null,
                                          subcategories: [],
                                          goods: [],
                                          name: 'Category 2',
                                      },
                                      {
                                          _id: 3,
                                          parent: null,
                                          subcategories: [],
                                          goods: [],
                                          name: 'Category 3',
                                      },
                                      {
                                          _id: 4,
                                          parent: null,
                                          subcategories: [],
                                          goods: [],
                                          name: 'Category 4',
                                      },
                                      {
                                          _id: 5,
                                          parent: 1,
                                          subcategories: [],
                                          goods: [],
                                          name: 'Category 4',
                                      },
                                      {
                                          _id: 6,
                                          parent: 1,
                                          subcategories: [],
                                          goods: [],
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
