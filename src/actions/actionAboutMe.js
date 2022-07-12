import { gql } from "../helpers";
import { actionPromise } from "../reducers";

export const actionAboutMe = () => async (dispatch, getState) => {
    const {
        auth: {
            payload: {
                sub: { _id },
            },
        },
    } = getState();
    await dispatch(
        actionPromise(
            "aboutMe",
            gql(
                `query AboutMe($q:String){
                        UserFindOne(query:$q){
                            _id username name nick avatar{
                                _id url
                            }
                        }
                    }`,
                {
                    q: JSON.stringify([{ _id }]),
                }
            )
        )
    );
};