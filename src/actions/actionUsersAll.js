import { actionPromise } from "../reducers";
import { backendURL, gql } from "../helpers";

export const actionUsersAll =
    ({ limit = 0, skip = 0, promiseName = "adminUsersAll", orderBy = "_id" } = {}) =>
    async (dispatch, getState) => {
        dispatch(
            actionPromise(
                promiseName,
                gql(
                    `query OUsersAll($query:String){
                        UserFind(query: $query){
                            _id username 
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
