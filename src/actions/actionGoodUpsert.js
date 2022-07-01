import { backendURL, gql } from '../helpers';
import { actionPromise } from '../reducers';

export const actionGoodUpsert = (good) => async (dispatch) => {

    dispatch(
        actionPromise(
            "goodUpsert",
            gql(
                `mutation GoodUpsert($good:GoodInput!){
                    GoodUpsert(good:$good){
                        _id name
                    }
                  }`,
                { good }
            )
        )
    );
};
