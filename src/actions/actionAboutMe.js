import { gql } from "../helpers";
import { actionPromise } from "../reducers";
import { promiseWorker } from "../reducers/promiseReducer";
import { call, select } from "redux-saga/effects";

export const actionAboutMe = () => ({ type: "ABOUT_ME" });

export function* aboutMeWorker() {
    const {
        auth: {
            payload: {
                sub: { _id },
            },
        },
    } = yield select();

    yield call(
        promiseWorker,
        actionPromise(
            "aboutMe",
            gql(
                `query AboutMe($q:String){
                UserFindOne(query:$q){
                    _id username name nick avatar{
                        _id url
                    }
                }
            }`,
                {
                    q: JSON.stringify([{ _id }]),
                }
            )
        )
    );
}
