import { actionPromise } from "../reducers";
import { gql } from "../helpers";
import { actionAuthLogin } from "../reducers";
import { actionAboutMe } from "./actionAboutMe";
import { actionLogout, logoutWorker } from "./actionLogout";
import { promiseWorker } from "../reducers/promiseReducer";
import { call, put } from "redux-saga/effects";

export const actionLogin = (username, password) => ({ type: "LOGIN", payload: { username, password } });
export function* loginWorker(action) {
    const { username, password } = action.payload || {};
    yield call(logoutWorker, actionLogout());

    const token = yield call(
        promiseWorker,
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

    if (token) {
        if (typeof token === "string") {
            yield put(actionAuthLogin(token));
        } else {
            yield put(actionAuthLogin(token.token));
        }

        yield put(actionAboutMe());
    }
}
