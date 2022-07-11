import { gql } from "../helpers";
import { actionPromise } from "../reducers";

export const actionUserUpsert = (user) => async (dispatch, getState) => {
    if (!user?.password?.length) {
        delete user.password;
    }

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
