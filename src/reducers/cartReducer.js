export function cartReducer(state = {}, { type, good, count = 1 }) {
    if (count <= 0) {
        type = 'CART_DELETE';
    }

    if (type === 'CART_ADD') {
        return {
            ...state,
            [good['_id']]: {
                good,
                count: good['_id'] in state ? state[good._id].count + count : count,
            },
        };
    }
    if (type === 'CART_CHANGE') {
        return {
            ...state,
            [good['_id']]: {
                good,
                count: count,
            },
        };
    }
    if (type === 'CART_DELETE') {
        let { [good._id]: toRemove, ...newState } = state;
        return newState;
    }
    if (type === 'CART_CLEAR') {
        return {};
    }
    return state;
}

export const actionCartAdd = (good, count = 1) => ({ type: 'CART_ADD', good, count: +count });
export const actionCartChange = (good, count = 1) => ({ type: 'CART_CHANGE', good, count: +count });
export const actionCartDelete = (good) => ({ type: 'CART_DELETE', good });
export const actionCartClear = () => ({ type: 'CART_CLEAR' });
