import { gql } from "../helpers";
import { actionPromise } from "../reducers";

export const actionCatsFind = ({ text = "", limit = 7, skip = 0, promiseName = "catsFind", orderBy = "_id" } = {}) =>
    actionPromise(
        promiseName,
        gql(
            `query CatsFind($query:String){
                        CategoryFind(query: $query){
                            _id name 
                            parent{
                                _id name
                            }

                        }
                    }`,
            {
                query: JSON.stringify([
                    { or: { name__icontains: text, _id__icontains: text } },
                    {
                        limit: !!limit ? limit : 5,
                        skip,
                        orderBy,
                    },
                ]),
            }
        )
    );
