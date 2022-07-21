import { call } from "redux-saga/effects";
import { gql } from "../helpers";
import { actionPromise } from "../reducers";
import { promiseWorker } from "../reducers/promiseReducer";

export const actionCategoryGoods = ({ limit = 20, skip = 0, promiseName = "categoryGoods", orderBy = "_id", category } = {}) => ({
    type: "CATEGORY_GOODS",
    payload: { limit, skip, promiseName, orderBy, category },
});
export function* categoryGoodsWorker(action) {
    const { limit = 20, skip = 0, promiseName = "categoryGoods", orderBy = "_id", category } = action.payload || {};
    if (!category) {
        return;
    }

    yield call(
        promiseWorker,
        actionPromise(
            promiseName,
            gql(
                `query CategoryGoods($query:String){
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
                            categories__in: [category._id],
                        },
                        {
                            limit: !!limit ? limit : 100,
                            skip: skip,
                            orderBy,
                        },
                    ]),
                }
            )
        )
    );
}
