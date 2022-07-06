import { actionPromise } from "../reducers";
import { backendURL, gql } from "../helpers";

export const actionCatAll =
    ({ limit = 20, skip = 0, promiseName = "catAll", orderBy = "_id" } = {}) =>
    async (dispatch, getState) => {
        dispatch(
            actionPromise(
                promiseName,
                gql(
                    `query CatAll($query:String){
                        CategoryFind(query: $query){
                            _id name
                            parent{
                                _id, name
                            }
                            subcategories{
                                _id name
                            }
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
