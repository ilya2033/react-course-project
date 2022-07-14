import { gql } from "../helpers";

import { actionPromise } from "../reducers";

export const actionGoodsPopular = () =>
    actionPromise(
        "goodsPopular",
        gql(
            `query GoodsPopular($query:String){
                    GoodFind(query: $query){
                        _id name price amount
                        images{
                            _id url
                        }
                    }
                }`,
            {
                query: JSON.stringify([
                    {},
                    {
                        limit: 15,
                        orderBy: "popular",
                    },
                ]),
            }
        )
    );
