import { jwtDecode } from '../helpers';

export function authReducer(state, { type, token }) {
    if (state === undefined) {
        if (localStorage.authToken) {
            token = localStorage.authToken;
            type = 'AUTH_LOGIN';
            state = {};
        }
    }

    if (type === 'AUTH_LOGIN') {
        if (!token || !jwtDecode(token)) return {};
        localStorage.authToken = token;
        return {
            ...state,
            token: token,
            payload: jwtDecode(token),
        };
    }

    if (type === 'AUTH_LOGOUT') {
        localStorage.removeItem('authToken');
        return {};
    }
    return state || {};
}

export const actionAuthLogin = (token) => ({
    type: 'AUTH_LOGIN',
    token: token,
});

export const actionAuthLogout = () => ({ type: 'AUTH_LOGOUT' });
