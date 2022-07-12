import { gql } from "../helpers";

import { actionPromise } from "../reducers";

export const actionCategoryDelete =
    ({ category, promiseName = "categoryDelete" } = {}) =>
    async (dispatch, getState) => {};
