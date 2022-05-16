import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { actionPromise, actionPromiseClear } from '../../../reducers';
import Select from 'react-select';
import { actionOrderUpdate } from '../../../actions/actionOrderUpdate';
import { EntityEditor } from '../../common/EntityEditor';
import { actionUploadFiles } from '../../../actions/actionUploadFiles';
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
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Error } from '../../common/Error';
import { statusNumber, statusOptions } from '../../../helpers';

const orderSchema = Yup.object().shape({
    email: Yup.string().required("Обов'язкове"),
    phoneNumber: Yup.string().required("Обов'язкове"),
});

export const OrderForm = ({
    serverErrors,
    onSaveClick,
    onSave,
    onClose,
    promiseStatus,
    catList = [],
    order = {},
} = {}) => {
    const [inputCategories, setInputCategories] = useState([]);
    const [inputStatus, setInputStatus] = useState(null);

    useEffect(() => {
        console.log(inputStatus);
    }, [inputStatus]);

    const formik = useFormik({
        initialValues: {
            email: '',
            phoneNumber: '',
            price: 0,
            amount: 0,
        },
        validationSchema: orderSchema,
        validateOnChange: true,
        onSubmit: () => {
            let orderToSave = {};
            order?._id && (orderToSave._id = order._id);
            orderToSave.name = formik.values.name;
            orderToSave.description = formik.values.description;
            // orderToSave.price = +formik.values.price;
            // orderToSave.amount = +formik.values.amount;
            // orderToSave.categories = inputCategories;
            // orderToSave.images = inputImages?.map(({ _id }) => ({ _id })) || [];

            onSaveClick && onSaveClick();
            onSave(orderToSave);
        },
    });

    useEffect(() => {
        // setInputCategories(order?.categories || []);
        setInputStatus(order?.status || null);
        formik.setFieldValue('email', order.email || '');
        formik.setFieldValue('phoneNumber', order.phoneNumber || '');
    }, [order]);

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

                    <Box direction="row" sx={{ mt: 3 }} justifyContent="flex-end">
                        <Button
                            variant="contained"
                            disabled={!formik.isValid || formik.isSubmitting}
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
                </Grid>
            </Grid>
        </Box>
    );
};

export const COrderForm = connect(
    (state) => ({
        catList: state.promise.catAll?.payload || [],
        promiseStatus: state.promise.orderUpsert?.status || null,
        order: state.promise?.adminOrderById?.payload || {},
    }),
    {
        onSave: (order) => actionOrderUpdate(order),
        onClose: () => actionPromiseClear('orderUpsert'),
    }
)(OrderForm);
