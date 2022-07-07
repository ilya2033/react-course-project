import { gql } from "../helpers";
import { actionPromise } from "../reducers";

export const actionGoodsAll =
    ({ limit = 20, skip = 0, promiseName = "goodsAll", orderBy = "_id" } = {}) =>
    async (dispatch, getState) => {
        dispatch(
            actionPromise(
                promiseName,
                gql(
                    `query GoodsAll($query:String){
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
                            {},
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
    };
