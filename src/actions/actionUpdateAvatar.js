import { actionPromiseClear } from "../reducers";
import { actionAboutMe } from "./actionAboutMe";
import { actionUploadFile } from "./actionUploadFile";
import { actionUserUpsert } from "./actionUserUpsert";

export const actionUpdateAvatar = (file) => async (dispatch, getState) => {
    await dispatch(actionUploadFile(file));

    const {
        promise: {
            uploadFile: {
                payload: { _id },
                status,
            },
        },
    } = getState();

    await dispatch(actionUserUpsert({ avatar: { _id } }));

    if (status === "FULFILLED") {
        await dispatch(actionAboutMe());
    }

    await dispatch(actionPromiseClear("uploadFile"));
};
