import { backendURL } from '../helpers';
import { actionPromise } from '../reducers';

export const actionGoodUpsert = (good) => async (dispatch) => {
    const formData = new FormData();
    console.log(JSON.stringify(good.images));
    good._id && formData.append('_id', good._id);
    formData.append('name', good.name);
    formData.append('description', good.description);
    formData.append('amount', good.amount);
    formData.append('price', good.price);
    formData.append('images', JSON.stringify(good.images));
    formData.append('categories', JSON.stringify(good.categories));
    dispatch(
        actionPromise(
            'goodUpsert',
            fetch(`${backendURL}/good/`, {
                method: 'POST',
                headers: {
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
