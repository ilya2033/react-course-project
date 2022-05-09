import { actionRootCats } from './actionRootCats';

export const actionPageStart = () => async (dispatch, getState) => {
    dispatch(actionRootCats());

    // const {
    //     auth: { token },
    // } = getState();

    // if (token) {
    //     dispatch(actionAboutMe());
    // }
};
