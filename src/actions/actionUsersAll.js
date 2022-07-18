import { actionPromise } from "../reducers";
import { gql } from "../helpers";

export const actionUsersAll = ({ limit = 0, skip = 0, promiseName = "adminUsersAll", orderBy = "_id" } = {}) =>
    actionPromise(
        promiseName,
        gql(
            `query UsersAll($query:String){
                        UserFind(query: $query){
                            _id username is_active acl
                            avatar{
                                _id url
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
    );
