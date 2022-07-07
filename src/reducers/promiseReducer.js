export function promiseReducer(state = {}, { type, name, status, payload, error }) {
    if (type === "PROMISE") {
        return {
            ...state,
            [name]: { status, payload: status === "PROMISE" ? [name].payload : payload, error },
        };
    }
    if (type === "PROMISE_CLEAR") {
        const { [name]: toRemove, ...newState } = state;
        return newState;
    }
    return state;
}

export const actionPending = (name) => ({ type: "PROMISE", name, status: "PENDING" });
export const actionFulfilled = (name, payload) => ({ type: "PROMISE", name, status: "FULFILLED", payload });
export const actionRejected = (name, error) => ({ type: "PROMISE", name, status: "REJECTED", error });
export const actionPromiseClear = (name) => ({ type: "PROMISE_CLEAR", name });
export const actionPromise = (name, promise) => async (dispatch) => {
    dispatch(actionPending(name));

    try {
        let payload = await promise;
        dispatch(actionFulfilled(name, payload));

        return payload;
    } catch (error) {
        dispatch(actionRejected(name, JSON.parse(error.message)));
    }
};
