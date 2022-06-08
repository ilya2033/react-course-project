import { backendURL } from '../helpers';
import { actionPromise } from '../reducers';

export const actionUploadFile = (file) => {
    const fd = new FormData();
    fd.append('photo', file);
    return actionPromise(
        'uploadFile',
        fetch(`${backendURL}/upload/`, {
            method: 'POST',
            headers: localStorage.authToken ? { Authorization: 'Bearer ' + localStorage.authToken } : {},
            body: fd,
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.errors) {
                    throw new Error(JSON.stringify(data.errors));
                } else return data.data;
            })
    );
};
