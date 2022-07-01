import { backendURL, mock, query, gql } from '../helpers';

import { actionPromise } from '../reducers';

export const actionGoodsPopular = () => async (dispatch, getState) => {
    dispatch(
        actionPromise(
            'goodsPopular',
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
                            sort: 'popular',
                        },
                    ]),
                }
            )
        )
    );
};
