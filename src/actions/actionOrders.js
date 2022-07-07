import { actionPromise } from "../reducers";
import { gql } from "../helpers";
export const actionOrders =
    ({ promiseName = "orders" } = {}) =>
    (dispatch) =>
        dispatch(
            actionPromise(
                promiseName,
                gql(
                    `
            query orders($query:String){
                OrderFind(query:$query){
                    _id price createdAt status 
                    orderGoods{
                        _id count price good{
                            name _id price images{
                                url _id
                            }
                        }
                    }
                }
            }
          `,
                    { query: JSON.stringify([{}, { orderBy: "-createdAt", limit: 200 }]) }
                )
            )
        );
