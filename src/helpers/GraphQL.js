export const getGQL = (url) => (query, variables) =>
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(localStorage.authToken ? { Authorization: "Bearer " + localStorage.authToken } : {}),
        },
        body: JSON.stringify({ query, variables }),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.errors) {
                throw new Error(JSON.stringify(data.errors));
            } else return Object.values(data.data)[0];
        });
