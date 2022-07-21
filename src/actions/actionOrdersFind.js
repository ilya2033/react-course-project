import { gql } from "../helpers";
import { actionPromise } from "../reducers";

export const actionOrdersFind = ({ text = "", limit = 7, skip = 0, promiseName = "ordersFind", orderBy = "_id", status = "0" } = {}) =>
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
                    { or: { owner__username__icontains: text, _id__icontains: text, status__icontains: text }, status },
                    {
                        limit: !!limit ? limit : 5,
                        skip,
                        orderBy,
                    },
                ]),
            }
        )
    );
