import { gql } from "../helpers";
import { actionPromise } from "../reducers";

export const actionOrdersFind =
    ({ text = "", limit = 7, skip = 0, promiseName = "ordersFind", orderBy = "_id" }) =>
    async (dispatch, getState) => {
        dispatch(
            actionPromise(
                promiseName,
                gql(
                    `query OrdersFind($query:String){
                        OrderFind(query: $query){
                            _id status price 
                            owner{
                                _id username
                            }
                        }
                    }`,
                    {
                        query: JSON.stringify([
                            { owner__username__contains: text, _id__contains: text, status__contains: text },
                            {
                                limit: !!limit ? limit : 5,
                                skip,
                                orderBy,
                            },
                        ]),
                    }
                )
            )
        );
    };
