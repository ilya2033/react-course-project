import { actionLogin } from '../../actions/actionLogin';

import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { Box, Button, IconButton, TextField, Stack } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const signInSchema = Yup.object().shape({
    username: Yup.string().required("Обов'язкове"),
    password: Yup.string().required("Обов'язкове"),
});

export const AuthForm = ({ onSubmit }) => {
    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: signInSchema,
        validateOnChange: true,
        onSubmit: () => {
            onSubmit(formik.values.username, formik.values.password);
        },
    });

    return (
        <Box
            className="AuthForm"
            display="flex"
            flexDirection="column"
            onSubmit={formik.handleSubmit}
            justifyContent="center"
        >
            <TextField
                id="username"
                name="username"
                variant="outlined"
                label="Username"
                error={formik.touched.username && Boolean(formik.errors.username)}
                value={formik.values.username}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={formik.touched.username && formik.errors.username}
                fullWidth
                sx={{ mt: 2 }}
            />

            <TextField
                id="password"
                name="password"
                variant="outlined"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                error={formik.touched.password && Boolean(formik.errors.password)}
                value={formik.values.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                    endAdornment: (
                        <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                            {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                        </IconButton>
                    ),
                }}
                fullWidth
                sx={{ mt: 2 }}
            />
            <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={formik.isSubmitting || !formik.isValid}
                sx={{ mt: 2, mr: 1 }}
                fullWidth
            >
                Увійти
            </Button>
        </Box>
    );
};

export const CAuthForm = connect(null, { onAuth: (login, password) => actionLogin(login, password) })(AuthForm);
