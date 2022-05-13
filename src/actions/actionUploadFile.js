import { actionPromise } from '../reducers';

export const actionUploadFile = (file) => {
    const fd = new FormData();
    fd.append('photo', file);
    return actionPromise(
        'uploadFile',
        fetch('/upload', {
            method: 'POST',
            headers: localStorage.authToken ? { Authorization: 'Bearer ' + localStorage.authToken } : {},
            body: fd,
        }).then((res) => res.json())
    );
};
