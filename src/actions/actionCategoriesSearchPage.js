import { put, take } from "redux-saga/effects";
import { actionFeedCatsFind, actionFeedClear, actionPromiseClear } from "../reducers";

export const actionCategoriesSearchPage = ({ orderBy = "_id", text = "" } = {}) => ({
    type: "CATEGORIES_SEARCH_PAGE",
    payload: { orderBy, text },
});

export function* categoriesSearchPageWorker(action) {
    const { orderBy = "_id", text = "" } = action.payload || {};
    yield put(actionFeedClear());
    yield put(actionPromiseClear("feedCatsFind"));
    console.log(1);
    yield put(actionFeedCatsFind({ text, orderBy, skip: 0 }));

    yield take("CATEGORIES_SEARCH_PAGE_CLEAR");
    yield put(actionFeedClear());
    yield put(actionPromiseClear("feedCatsFind"));
}
