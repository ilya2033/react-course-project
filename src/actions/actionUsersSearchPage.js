import { put, take } from "redux-saga/effects";
import { actionFeedClear, actionFeedUsersFind, actionPromiseClear } from "../reducers";

export const actionUsersSearchPage = ({ orderBy = "_id", text = "" } = {}) => ({ type: "USERS_SEARCH_PAGE", payload: { orderBy, text } });

export function* usersSearchPageWorker(action) {
    const { orderBy = "_id", text = "" } = action.payload || {};
    yield put(actionFeedClear());
    yield put(actionPromiseClear("feedUsersFind"));
    yield put(actionFeedUsersFind({ skip: 0, orderBy, text }));

    yield take("USERS_SEARCH_PAGE_CLEAR");
    yield put(actionFeedClear());
    yield put(actionPromiseClear("feedUsersFind"));
}
