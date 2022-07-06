import { backendURL, gql, mock, query } from "../helpers";

import { actionPromise } from "../reducers";

export const actionOrderById = ({ _id, promiseName = "orderById" }) =>
    actionPromise(
        promiseName,
        gql(
            `query OrderById($q:String){
                OrderFindOne(query: $q){
                _id status
                owner{
                    _id username
                }
                orderGoods{
                    _id
                    good{
                        _id name
                    }
                    count

                }
            }
        }`,
            { q: JSON.stringify([{ _id }]) }
        )
    );
