import { gql } from "../helpers";

import { actionPromise } from "../reducers";

export const actionCatById = ({ _id, promiseName = "catById", orderBy = "", limit = 20, skip = 0 }) =>
    actionPromise(
        promiseName,
        gql(
            `query CatById($q:String){
                CategoryFindOne(query: $q){
                    _id name
                    parent{
                        _id, name
                    }
                    subcategories{
                        _id name
                    }
                    goods{
                        _id name price amount
                    }
                }
            }`,
            { q: JSON.stringify([{ _id }, { limit: !!limit ? limit : 5, skip, goods_order: orderBy }]) }
        )
    );
