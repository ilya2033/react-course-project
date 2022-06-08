import { connect, useSelector } from 'react-redux';
import React, { useState, useEffect, useContext } from 'react';
import { actionPromise, actionPromiseClear } from '../../../reducers';
import Select from 'react-select';
import { actionOrderUpdate } from '../../../actions/actionOrderUpdate';
import { EntityEditor } from '../../common/EntityEditor';
import { actionUploadFiles } from '../../../actions/actionUploadFiles';
import { UIContext } from '../../UIContext';
import {
    Box,
    Button,
    Chip,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Stack,
    TextareaAutosize,
    TextField,
    Typography,
} from '@mui/material';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { Error } from '../../common/Error';
import { statusNumber, statusOptions } from '../../../helpers';
import { OrderGoodsEditor } from './OrderGoodsEditor';

const deliveryOptions = [
    { label: 'Нова пошта', value: 'nova-poshta' },
    { label: 'Justin', value: 'justin' },
];

const orderSchema = Yup.object().shape({
    email: Yup.string().required("Обов'язкове"),
    phoneNumber: Yup.string().required("Обов'язкове"),
    name: Yup.string(),
    address: Yup.string().required("Обов'язкове"),
    surname: Yup.string(),
    delivery: Yup.string()
        .required("обов'язкове")
        .oneOf(
            deliveryOptions.map((option) => option.value),
            'не знайдено'
        ),
});

export const OrderForm = ({ serverErrors = [], onSaveClick, onSave, onClose, promiseStatus, order = {} } = {}) => {
    const [inputStatus, setInputStatus] = useState(null);
    const { setAlert } = useContext(UIContext);
    const goodList = useSelector((state) => state.promise?.goodsAll?.payload || []);
    const [inputOrderGoods, setInputOrderGoods] = useState([]);

    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            surname: '',
            phoneNumber: '',
            delivery: '',
            address: '',
        },
        validationSchema: orderSchema,
        validateOnChange: true,
        onSubmit: () => {
            let orderToSave = {};
            order?._id && (orderToSave._id = order._id);
            orderToSave.name = formik.values.name;
            orderToSave.email = formik.values.email;
            orderToSave.status = inputStatus;
            orderToSave.surname = formik.values.surname;
            orderToSave.phoneNumber = formik.values.phoneNumber;
            orderToSave.address = formik.values.address;
            orderToSave.delivery = formik.values.delivery;
            orderToSave.orderGoods = inputOrderGoods;
            onSaveClick && onSaveClick();
            onSave(orderToSave);
        },
    });

    useEffect(() => {
        setInputStatus(order?.status || null);
        setInputOrderGoods(order.orderGoods || []);
        formik.setFieldValue('email', order.email || '');
        formik.setFieldValue('name', order.name || '');
        formik.setFieldValue('address', order.address || '');
        formik.setFieldValue('surname', order.surname || '');
        formik.setFieldValue('phoneNumber', order.phoneNumber || '');
        formik.setFieldValue('delivery', order.delivery || '');
    }, [order]);

    useEffect(() => {
        formik.validateForm();
    }, [formik.values]);

    useEffect(() => {
        if (promiseStatus === 'FULFILLED') {
            formik.setSubmitting(false);
            setAlert({
                show: true,
                severity: 'success',
                message: 'Готово',
            });
        }
        if (promiseStatus === 'REJECTED') {
            const errorMessage = serverErrors.reduce((prev, curr) => prev + '\n' + curr.message, '');
            formik.setSubmitting(false);
            setAlert({
                show: true,
                severity: 'error',
                message: errorMessage,
            });
        }
    }, [promiseStatus]);

    useEffect(() => {
        return () => {
            onClose && onClose();
        };
    }, []);
    return (
        <Box className="OrderForm" component="form" onSubmit={formik.handleSubmit}>
            {(serverErrors || []).map((error) => (
                <Error>{error?.message}</Error>
            ))}
            <Grid container spacing={5}>
                <Grid item xs={6}>
                    <TextField
                        id="email"
                        name="email"
                        variant="outlined"
                        label="Email"
                        size="small"
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        helperText={formik.touched.email && formik.errors.email}
                        fullWidth
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        id="name"
                        name="name"
                        variant="outlined"
                        label="Ім'я"
                        size="small"
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        value={formik.values.name}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        helperText={formik.touched.name && formik.errors.name}
                        fullWidth
                        sx={{ mt: 2 }}
                    />

                    <Box sx={{ mt: 3 }}>
                        <InputLabel className="form-label">Статус</InputLabel>
                        <Select
                            value={{
                                value: inputStatus || null,
                                label: inputStatus ? statusNumber[inputStatus] : null,
                            }}
                            onChange={(e) => setInputStatus(e.value)}
                            options={statusOptions}
                        />
                    </Box>

                    <Box sx={{ mt: 3 }}>
                        <InputLabel className="form-label">Товари</InputLabel>
                        <OrderGoodsEditor
                            orderGoods={inputOrderGoods}
                            goodList={goodList}
                            onChange={(orderGoods) => {
                                setInputOrderGoods([...orderGoods]);
                            }}
                        />
                    </Box>

                    <Box direction="row" sx={{ mt: 3 }} justifyContent="flex-end">
                        <Button
                            variant="contained"
                            disabled={Boolean(!formik.isValid || formik.isSubmitting)}
                            type="submit"
                            fullWidth
                        >
                            Зберегти
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        variant="outlined"
                        id="phoneNumber"
                        name="phoneNumber"
                        label="Номер"
                        size="small"
                        error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                        value={formik.values.phoneNumber}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                        multiline
                        fullWidth
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        id="surname"
                        name="surname"
                        variant="outlined"
                        label="Прізвище"
                        size="small"
                        error={formik.touched.surname && Boolean(formik.errors.surname)}
                        value={formik.values.surname}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        helperText={formik.touched.surname && formik.errors.surname}
                        fullWidth
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        id="address"
                        name="address"
                        variant="outlined"
                        label="Адреса"
                        size="small"
                        error={formik.touched.address && Boolean(formik.errors.address)}
                        value={formik.values.address}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        helperText={formik.touched.address && formik.errors.address}
                        fullWidth
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        id="delivery"
                        name="delivery"
                        variant="outlined"
                        label="Тип доставкі"
                        size="small"
                        select
                        error={formik.touched.delivery && Boolean(formik.errors.delivery)}
                        value={formik.values.delivery}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        helperText={formik.touched.delivery && formik.errors.delivery}
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        {deliveryOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value} t>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </Grid>
        </Box>
    );
};

export const COrderForm = connect(
    (state) => ({
        promiseStatus: state.promise.orderUpsert?.status || null,
        serverErrors: state.promise.orderUpsert?.error || null,
        order: state.promise?.adminOrderById?.payload || {},
    }),
    {
        onSave: (order) => actionOrderUpdate(order),
        onClose: () => actionPromiseClear('orderUpsert'),
    }
)(OrderForm);
