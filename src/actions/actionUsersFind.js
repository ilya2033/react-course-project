import { actionPromise } from "../reducers";
import { gql } from "../helpers";

export const actionUsersFind = ({ text = "", limit = 0, skip = 0, promiseName = "adminUsersFind", orderBy = "_id" } = {}) =>
    actionPromise(
        promiseName,
        gql(
            `query UsersFind($query:String){
                        UserFind(query: $query){
                            _id username acl is_active
                            avatar{
                                _id url
                            }
                        }
                    }`,
            {
                query: JSON.stringify([
                    {
                        or: { username__icontains: text, _id__icontains: text },
                    },
                    {
                        limit: !!limit ? limit : 100,
                        skip: skip,
                        orderBy,
                    },
                ]),
            }
        )
    );
