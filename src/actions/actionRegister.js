import { call, put, select } from "redux-saga/effects";
import { gql } from "../helpers";
import { actionPromise } from "../reducers";
import { promiseWorker } from "../reducers/promiseReducer";
import { actionLogin } from "./actionLogin";

export const actionRegister = (username, password) => ({ type: "REGISTER", payload: { username, password } });

export function* registerWorker(action) {
    const { username, password } = action.payload || {};
    yield call(
        promiseWorker,
        actionPromise(
            "register",
            gql(
                `mutation register($username:String,$password:String){
              UserUpsert(user:{username:$username,password:$password}){
                  _id username
              }
          }`,
                {
                    username,
                    password,
                }
            )
        )
    );
    const {
        promise: { register },
    } = yield select();
    if (register.status === "FULFILLED") {
        yield put(actionLogin(username, password));
    }
}
