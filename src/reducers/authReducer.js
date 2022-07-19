import { takeLatest } from "redux-saga/effects";
import { loginWorker } from "../actions/actionLogin";
import { logoutWorker } from "../actions/actionLogout";
import { registerWorker } from "../actions/actionRegister";
import { jwtDecode } from "../helpers";

export function authReducer(state, { type, token }) {
    if (state === undefined) {
        if (localStorage.authToken) {
            token = localStorage.authToken;
            type = "AUTH_LOGIN";
            state = {};
        }
    }

    if (type === "AUTH_LOGIN") {
        if (!token || !jwtDecode(token)) return {};
        localStorage.authToken = token;
        return {
            ...state,
            token: token,
            payload: jwtDecode(token),
        };
    }

    if (type === "AUTH_LOGOUT") {
        localStorage.removeItem("authToken");
        return {};
    }
    return state || {};
}

export const actionAuthLogin = (token) => ({
    type: "AUTH_LOGIN",
    token: token,
});

export function* authWatcher() {
    yield takeLatest("LOGIN", loginWorker);
    yield takeLatest("LOGOUT", logoutWorker);
    yield takeLatest("REGISTER", registerWorker);
}

export const actionAuthLogout = () => ({ type: "AUTH_LOGOUT" });
