export const mock = (success, error, timeout) => {
    return new Promise(() => {
        setTimeout((resolve, reject) => {
            if (Math.random() > 0.1) {
                console.log(success());
                resolve(success());
            } else {
                reject(error());
            }
        }, timeout || 1000);
    });
};
