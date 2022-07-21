import { gql } from "../helpers";

import { actionPromise } from "../reducers";

export const actionUserById = ({ _id, promiseName = "adminUserById" } = {}) =>
    actionPromise(
        promiseName,
        gql(
            `query UsersById($q:String){
                UserFindOne(query: $q){
                    _id username is_active acl name nick
                    avatar{
                        _id url
                    }
                }
            }`,
            { q: JSON.stringify([{ _id }]) }
        )
    );
