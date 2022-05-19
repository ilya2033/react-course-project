import { Box, Grid, TextField, MenuItem, Button, Alert, Snackbar } from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { connect } from 'react-redux';
import { actionPromiseClear } from '../../../reducers';
import { actionOrderUpdate } from '../../../actions/actionOrderUpdate';
import { useEffect, useState } from 'react';

const deliveryOptions = [
    { label: 'Нова пошта', value: 'nova-poshta' },
    { label: 'Justin', value: 'justin' },
];

const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const orderSchema = Yup.object().shape({
    name: Yup.string().min(3, 'не меньше 3 символів').max(22, 'не більше 22 символів').required("обов'язкове"),
    surname: Yup.string().min(3, 'не меньше 3 символів').max(22, 'не більше 22 символів').required("обов'язкове"),
    email: Yup.string().email('не вірний формат').required("обов'язкове"),
    address: Yup.string().required("обов'язкове"),
    phoneNumber: Yup.string().matches(phoneRegExp, 'не вірний формат').required("обов'язкове"),
    delivery: Yup.string()
        .required("обов'язкове")
        .oneOf(
            deliveryOptions.map((option) => option.value),
            'не знайдено'
        ),
});

export const OrderForm = ({ onSubmit = null, promiseStatus = null, serverErrors = [] } = {}) => {
    const formik = useFormik({
        initialValues: {
            name: '',
            surname: '',
            email: '',
            address: '',
            phoneNumber: '',
            delivery: '',
        },
        validationSchema: orderSchema,
        validateOnChange: true,
        onSubmit: () => {
            onSubmit(formik.values);
        },
    });
    const [snackbar, setSnackbar] = useState({ isOpen: false, message: '', type: 'success' });

    useEffect(() => {
        if (promiseStatus === 'FULFILLED') {
            formik.setSubmitting(false);
            setSnackbar({ ...snackbar, isOpen: true, message: 'Готово', type: 'success' });
        }
        if (promiseStatus === 'REJECTED') {
            const errorMessage = serverErrors.reduce((prev, curr) => prev + '\n' + curr.message, '');
            console.log(serverErrors);
            formik.setSubmitting(false);
            setSnackbar({ ...snackbar, isOpen: true, message: errorMessage, type: 'error' });
        }
    }, [promiseStatus]);

    return (
        <Box className="OrderForm" component="form" onSubmit={formik.handleSubmit}>
            <Grid container spacing={2} rowSpacing={1}>
                <Grid item xs={6}>
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
                    />
                </Grid>
                <Grid item xs={6}>
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
                    />
                </Grid>
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
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="phoneNumber"
                        name="phoneNumber"
                        variant="outlined"
                        label="Номер телефону"
                        size="small"
                        error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                        value={formik.values.phoneNumber}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="address"
                        name="address"
                        variant="outlined"
                        label="Адреса доставки"
                        size="small"
                        error={formik.touched.address && Boolean(formik.errors.address)}
                        value={formik.values.address}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        helperText={formik.touched.address && formik.errors.address}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="delivery"
                        name="delivery"
                        variant="outlined"
                        label="Тип доставкі"
                        size="small"
                        extAlign="left"
                        select
                        value={formik.values.delivery}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        helperText={formik.touched.delivery && formik.errors.delivery}
                        fullWidth
                    >
                        {deliveryOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value} t>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Snackbar
                    severity={snackbar.type}
                    message={snackbar.message}
                    autoHideDuration={3000}
                    open={snackbar.isOpen}
                    onClose={() => setSnackbar({ ...snackbar, isOpen: false })}
                    sx={{
                        width: 400,
                    }}
                >
                    <Alert severity={snackbar.type} sx={{ width: '100%' }} open={snackbar.isOpen}>
                        {snackbar.message}
                    </Alert>
                </Snackbar>
                <Grid item xs={12} display="flex" justifyContent="flex-end">
                    <Button variant="contained" type="submit" disabled={!formik.isValid || formik.isSubmitting}>
                        Підтвердити
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export const COrderForm = connect(
    (state) => ({
        promiseStatus: state.promise.orderUpsert?.status || null,
        serverErrors: state.promise?.orderUpsert?.error || [],
    }),
    {
        onClose: () => actionPromiseClear('orderUpsert'),
    }
)(OrderForm);
