import { actionPromise } from '../reducers';

export const actionOrderUpsert = (order) => async (dispatch) => {
    const formData = new FormData();
    order._id && formData.append('_id', order._id);
    formData.append('orderGoods', JSON.stringify(order.orderGoods));
    formData.append('email', order.email);
    formData.append('phoneNumber', order.phoneNumber);
    formData.append('address', order.address);
    formData.append('delivery', order.delivery);
    formData.append('name', order.name);
    formData.append('surname', order.surname);
    dispatch(
        actionPromise(
            'orderUpsert',
            fetch(`/order/`, {
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
