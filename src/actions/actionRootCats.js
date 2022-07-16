import { gql } from "../helpers";

import { actionPromise } from "../reducers";

export const actionRootCats = () =>
    actionPromise(
        "rootCats",
        gql(
            `query rootCats($query:String) {
                CategoryFind(query: $query){
                    _id name
                }
            }`,
            {
                query: JSON.stringify([
                    {
                        parent: null,
                    },
                ]),
            }
        )
    );
