import { gql } from "../helpers";

import { actionPromise } from "../reducers";

export const actionGoodById = ({ _id, promiseName = "goodById" } = {}) =>
    actionPromise(
        promiseName,
        gql(
            `query GoodById($q:String){
            GoodFindOne(query: $q){
                _id name amount description price 
                categories{
                    _id name
                }
                images{
                    _id
                    url
                }
            }
        }`,
            { q: JSON.stringify([{ _id }]) }
        )
    );
