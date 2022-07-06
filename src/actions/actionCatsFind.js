import { backendURL, gql } from "../helpers";
import { actionPromise } from "../reducers";

export const actionCatsFind =
    ({ text = "", limit = 7, skip = 0, promiseName = "catsFind", orderBy = "_id" }) =>
    async (dispatch, getState) => {
        dispatch(
            actionPromise(
                promiseName,
                gql(
                    `query CatsFind($query:String){
                        CategoryFind(query: $query){
                            _id name 
                            parent{
                                _id name
                            }

                        }
                    }`,
                    {
                        query: JSON.stringify([
                            { name__contains: text },
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
