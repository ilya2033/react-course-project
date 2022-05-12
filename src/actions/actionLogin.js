import { actionPromise } from '../reducers';
import { gql } from '../helpers';
import { actionAuthLogin } from '../reducers';

export const actionLogin = (login, password) => async (dispatch, getState) => {
    const token = await dispatch(
        actionPromise(
            'login',
            new Promise((resolve) => {
                setTimeout(
                    Math.random() > 0.01
                        ? resolve({
                              data: {
                                  login: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOiI2MjYyY2I0MGJmOGIyMDY0MzNmNWIzZDIiLCJsb2dpbiI6InRlc3QxMTIxMSIsImFjbCI6WyI2MjYyY2I0MGJmOGIyMDY0MzNmNWIzZDIiLCJ1c2VyIl19LCJpYXQiOjE2NTIzNzcxNTF9.j462Ble3m-eycfY_QS_wBSQmR6UZ65FxrKUqkF3MBBY',
                              },
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
    dispatch(actionAuthLogin(token));
};
