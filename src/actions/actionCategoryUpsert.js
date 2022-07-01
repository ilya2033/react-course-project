import { backendURL } from '../helpers';
import { actionPromise } from '../reducers';

export const actionCategoryUpsert = (category) => async (dispatch) => {
    const formData = new FormData();
    category._id && formData.append('_id', category._id);
    category.name && formData.append('name', category.name);
    category.goods && formData.append('goods', JSON.stringify(category.goods));
    category.parent !== undefined && formData.append('parent', JSON.stringify(category.parent));
    category.subcategories && formData.append('subcategories', JSON.stringify(category.subcategories));
    dispatch(
        actionPromise(
            'categoryUpsert',
            fetch(`${backendURL}/category/`, {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    ...(localStorage.authToken ? { Authorization: 'Bearer ' + localStorage.authToken } : {}),
                },
                body: formData,
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.errors) {
                        throw new Error(JSON.stringify(data.errors));
                    } else return data.data;
                })
        )
    );
};
