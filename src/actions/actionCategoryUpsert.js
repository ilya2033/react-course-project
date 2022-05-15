import { actionPromise } from '../reducers';

export const actionCategoryUpsert = (good) => async (dispatch) => {
    dispatch(
        actionPromise(
            'categoryUpsert',
            new Promise((resolve) => {
                setTimeout(
                    Math.random() > 0.01
                        ? resolve({
                              data: {
                                  _id: 6,
                                  parent: 1,
                                  subcategories: [],
                                  goods: [],
                                  name: 'Category 4',
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
