import { actionPromise } from "../reducers";
import { gql } from "../helpers";
export const actionOrders = () => (dispatch) =>
  dispatch(
    actionPromise(
      "orders",
      gql(`
            query orders{
                OrderFind(query:"[{}]"){
                    _id price createdAt status orderGoods{
                        _id count price good{
                            name _id price images{
                                url _id
                            }
                        }
                    }
                }
            }
          `)
    )
  );
