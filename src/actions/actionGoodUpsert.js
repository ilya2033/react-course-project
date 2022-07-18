import { gql } from "../helpers";
import { actionPromise } from "../reducers";

export const actionGoodUpsert = (good) =>
    actionPromise(
        "goodUpsert",
        gql(
            `mutation GoodUpsert($good:GoodInput!){
                    GoodUpsert(good:$good){
                        _id name
                    }
                  }`,
            { good }
        )
    );
