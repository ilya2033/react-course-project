import { actionPromiseClear } from "../reducers";
import { actionAboutMe } from "./actionAboutMe";
import { actionUploadFile } from "./actionUploadFile";
import { actionUserUpsert } from "./actionUserUpsert";

export const actionUserUpdate = (user) => async (dispatch, getState) => {
    await dispatch(actionUserUpsert(user));

    if (!user) {
        return;
    }

    const {
        promise: {
            userUpsert: { status },
        },
    } = getState();

    if (status === "FULFILLED") {
        await dispatch(actionAboutMe());
    }

    await dispatch(actionPromiseClear("userUpsert"));
};
