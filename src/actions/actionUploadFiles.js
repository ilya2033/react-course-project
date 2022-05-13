import { actionUploadFile } from './actionUploadFile';
import { actionPromise } from '../reducers';

export const actionUploadFiles =
    (files = []) =>
    async (dispatch, getState) => {
        actionPromise('uploadFiles', await Promise.all(files?.map((file) => dispatch(actionUploadFile(file)))));
    };
