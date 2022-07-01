import { actionPromise } from '../reducers';
import { backendURL, gql } from '../helpers';
import { actionAuthLogin } from '../reducers';

export const actionLogin = (username, password) => async (dispatch, getState) => {
    const token = await dispatch(
        actionPromise(
            'login',
            gql(
                `mutation Login($username:String!,$password:String!){
                    tokenAuth(username:$username,password:$password){
                        token
                    }
                }`,
                { username, password }
            )
        )
    );
    if (typeof token === 'string') {
        dispatch(actionAuthLogin(token));
    } else {
        dispatch(actionAuthLogin(token.token));
    }
};
