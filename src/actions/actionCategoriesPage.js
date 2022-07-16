import { put, take } from "redux-saga/effects";
import { actionFeedCats, actionFeedClear, actionPromiseClear } from "../reducers";

export const actionCategoriesPage = ({ orderBy }) => ({ type: "CATEGORIES_PAGE", payload: { orderBy } });

export function* categoriesPageWorker(action) {
    const { orderBy = "_id" } = action.payload || {};
    yield put(actionFeedClear());
    yield put(actionPromiseClear("feedCatAll"));
    yield put(actionPromiseClear("categoryUpsert"));
    yield put(actionFeedCats({ skip: 0, orderBy }));

    yield take("CATEGORIES_PAGE_CLEAR");
    yield put(actionFeedClear());
    yield put(actionPromiseClear("feedCatAll"));
}
