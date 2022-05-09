export const getQuery =
    () =>
    (url, type = 'GET', body = {}) =>
        fetch(url, {
            method: type,
            headers: {
                'Content-Type': 'application/json',
                ...(localStorage.authToken ? { Authorization: 'Bearer ' + localStorage.authToken } : {}),
            },
            body: body,
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.errors) {
                    throw new Error(JSON.stringify(data.errors));
                } else return Object.values(data.data);
            });
