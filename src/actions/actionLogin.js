import { actionPromise } from '../reducers';
import { gql } from '../helpers';
import { actionAuthLogin } from '../reducers';

export const actionLogin = (login, password) => async (dispatch, getState) => {
    const formData = new FormData();
    console.log(login, password);
    formData.append('username', login);
    formData.append('password', password);

    const token = await dispatch(
        actionPromise(
            'login',
            fetch(`/auth/token/`, {
                method: 'POST',
                headers: {
                    ...(localStorage.authToken ? { Authorization: 'Bearer ' + localStorage.authToken } : {}),
                },
                body: formData,
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if (data.errors) {
                        throw new Error(JSON.stringify(data.errors));
                    } else return data.access;
                })
        )
    );

    dispatch(actionAuthLogin(token));
};
