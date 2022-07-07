import { gql } from "../helpers";
import { actionPromise } from "../reducers";

export const actionCategoryGoods =
    ({ limit = 20, skip = 0, promiseName = "categoryGoods", orderBy = "_id", category } = {}) =>
    async (dispatch, getState) => {
        if (!category) {
            return;
        }
        dispatch(
            actionPromise(
                promiseName,
                gql(
                    `query GCategoryGoods($query:String){
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
    };
