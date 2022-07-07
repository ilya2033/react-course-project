import { gql } from "../helpers";

import { actionPromise } from "../reducers";

export const actionGoodDelete = ({ good, promiseName = "goodDelete" } = {}) =>
    actionPromise(
        promiseName,
        gql(
            `mutation GoodDelete($good:GoodInput!){
                GoodDelete(good:$good){
                    _id name
                }
            }`,
            { good }
        )
    );
