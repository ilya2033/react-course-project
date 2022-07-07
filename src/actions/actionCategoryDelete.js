import { gql } from "../helpers";

import { actionPromise } from "../reducers";

export const actionCategoryDelete = ({ category, promiseName = "categoryDelete" } = {}) =>
    actionPromise(
        promiseName,
        gql(
            `mutation CatDelete($category:CategoryInput!){
                CategoryDelete(category:$category){
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
            { category }
        )
    );
