import { actionPromise } from "../reducers";
import { backendURL, gql } from "../helpers";
import { actionAuthLogin } from "../reducers";
import { actionAboutMe } from "./actionAboutMe";
import { actionLogout } from "./actionLogout";

export const actionLogin = (username, password) => async (dispatch, getState) => {
    await dispatch(actionLogout());
    const token = await dispatch(
        actionPromise(
            "login",
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
    if (typeof token === "string") {
        await dispatch(actionAuthLogin(token));
    } else {
        await dispatch(actionAuthLogin(token.token));
    }

    await dispatch(actionAboutMe());
};
