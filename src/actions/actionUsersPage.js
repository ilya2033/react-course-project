import { put, take } from "redux-saga/effects";
import { actionFeedClear, actionFeedUsers, actionPromiseClear } from "../reducers";

export const actionUsersPage = ({ orderBy = "_id" } = {}) => ({ type: "USERS_PAGE", payload: { orderBy } });

export function* usersPageWorker(action) {
    const { orderBy = "_id" } = action.payload || {};
    yield put(actionFeedClear());
    yield put(actionPromiseClear("feedUsersAll"));
    yield put(actionFeedUsers({ skip: 0, orderBy }));
    yield take("USERS_PAGE_CLEAN");

    yield put(actionFeedClear());
    yield put(actionPromiseClear("feedUsersAll"));
}
