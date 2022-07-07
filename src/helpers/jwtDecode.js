export const jwtDecode = (token) => {
    try {
        let payload = JSON.parse(atob(token.split(".")[1]));

        return payload;
    } catch (e) {
        console.log(e);
    }
};
