import { actionPromise } from "../reducers";
import { backendURL, gql } from "../helpers";

export const actionOrdersAll =
    ({ limit = 0, skip = 0, promiseName = "adminOrdersAll", orderBy = "_id", status = 0 } = {}) =>
    async (dispatch, getState) => {
        dispatch(
            actionPromise(
                promiseName,
                gql(
                    `query OrdersAll($query:String){
                        OrderFind(query: $query){
                            _id status price 
                            owner{
                                _id username
                            }
                            orderGoods{
                                _id count good{
                                    _id name price 
                                }
                            }
                        }
                    }`,
                    {
                        query: JSON.stringify([
                            {
                                status,
                            },
                            {
                                limit: !!limit ? limit : 100,
                                skip: skip,
                                orderBy,
                            },
                        ]),
                    }
                )
            )
        );
    };
