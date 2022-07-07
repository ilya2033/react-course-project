import { gql } from "../helpers";
import { actionPromise } from "../reducers";

export const actionGoodsFind =
    ({ text = "", limit = 7, skip = 0, promiseName = "goodsFind", orderBy = "_id" }) =>
    async (dispatch, getState) => {
        dispatch(
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
                                name__contains: text,
                                description__contains: text,
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
    };
