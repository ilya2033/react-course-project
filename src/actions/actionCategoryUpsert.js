import { backendURL, gql } from "../helpers";
import { actionPromise } from "../reducers";

export const actionCategoryUpsert = (category) => async (dispatch) => {
    dispatch(
        actionPromise(
            "categoryUpsert",
            gql(
                `mutation CatUpsert($category:CategoryInput!){
                    CategoryUpsert(category:$category){
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
        )
    );
};
