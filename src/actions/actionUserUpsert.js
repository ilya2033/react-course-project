import { gql } from "../helpers";
import { actionPromise } from "../reducers";

export const actionUserUpsert = (user) => {
    if (!user?.password?.length) {
        delete user.password;
    }

    return actionPromise(
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
    );
};
