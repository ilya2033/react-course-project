import { call, delay, put } from "redux-saga/effects";
import { gql } from "../helpers";
import { actionPromise } from "../reducers";
import { promiseWorker } from "../reducers/promiseReducer";
export const actionGoodsFind = ({ text, limit, skip, promiseName, orderBy, delay }) => ({
    type: "GOODS_FIND",
    payload: { text, limit, skip, promiseName, orderBy, delay },
});
export function* goodsFindWorker(action) {
    const { text = "", limit = 7, skip = 0, promiseName = "goodsFind", orderBy = "_id", timeout = 0 } = action.payload || {};
    yield delay(timeout);
    yield call(
        promiseWorker,
        actionPromise(
            promiseName,
            gql(
                `query GoodsFind($query:String){
                        GoodFind(query: $query){
                            _id name price images{
                                _id url
                            }
                            categories{
                                _id name
                            }
                            amount
                        }
                    }`,
                {
                    query: JSON.stringify([
                        {
                            name__icontains: text,
                            description__icontains: text,
                        },
                        {
                            limit: !!limit ? limit : 5,
                            skip,
                            orderBy,
                        },
                    ]),
                }
            )
        )
    );
}
