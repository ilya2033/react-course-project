import { gql } from "../helpers";
import { actionPromise } from "../reducers";

export const actionUserUpsert = (user) => async (dispatch, getState) => {
    await dispatch(
        actionPromise(
            "userUpsert",
            gql(
                `mutation userUpsert($user:UserInput!){
              UserUpsert(user:$user){
                  _id username 
              }
          }`,
                {
                    user,
                }
            )
        )
    );
};
