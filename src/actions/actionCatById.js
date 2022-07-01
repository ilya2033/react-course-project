import { backendURL, mock, query, gql } from '../helpers';

import { actionPromise } from '../reducers';

export const actionCatById = ({ _id, promiseName = 'catById', orderBy = '', limit = 20, skip = 0 }) =>
    actionPromise(
        promiseName,
        gql(
            `query CatAll($q:String){
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
            { q: JSON.stringify([{ _id }]) }
        )
    );
