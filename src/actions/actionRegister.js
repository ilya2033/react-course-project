import { gql } from "../helpers";
import { actionPromise } from "../reducers";
import { actionLogin } from "./actionLogin";

export const actionRegister = (username, password) => async (dispatch, getState) => {
    await dispatch(
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
    } = getState();
    if (register.status === "FULFILLED") {
        dispatch(actionLogin(username, password));
    }
};
