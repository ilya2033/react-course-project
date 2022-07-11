import { actionLogin } from "../../../actions/actionLogin";

import { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Box, Button, IconButton, TextField, Stack } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UIContext } from "../../UIContext";

const signInSchema = Yup.object().shape({
    username: Yup.string().min(3, "Too Short!").max(15, "Too Long!").required("Required"),
    password: Yup.string().min(3, "Too Short!").max(15, "Too Long!").required("Required"),
});

export const LoginForm = ({
    onLogin,
    onRegisterButtonClick,
    promiseStatus,
    serverErrors,
    inputVariant = "standard",
    buttonVariant = "text",
} = {}) => {
    const [showPassword, setShowPassword] = useState(false);
    const { setAlert } = useContext(UIContext);
    const [promiseTimeOut, setPromiseTimeOut] = useState(null);

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            repeatPassword: "",
        },
        validationSchema: signInSchema,
        validateOnChange: true,
        onSubmit: () => {
            onLogin(formik.values.username, formik.values.password);
            setPromiseTimeOut(setTimeout(() => formik.setSubmitting(false), 3000));
        },
    });

    useEffect(() => {
        return () => {
            promiseTimeOut && clearTimeout(promiseTimeOut);
            setPromiseTimeOut(null);
        };
    }, []);

    useEffect(() => {
        if (promiseStatus === "FULFILLED") {
            formik.setSubmitting(false);
            promiseTimeOut && clearTimeout(promiseTimeOut);
            setPromiseTimeOut(null);
            setAlert({
                show: true,
                severity: "success",
                message: "Готово",
            });
        }
        if (promiseStatus === "REJECTED") {
            const errorMessage = serverErrors.reduce((prev, curr) => prev + "\n" + curr.message, "");
            formik.setSubmitting(false);
            promiseTimeOut && clearTimeout(promiseTimeOut);
            setPromiseTimeOut(null);
            setAlert({
                show: true,
                severity: "error",
                message: errorMessage,
            });
        }
    }, [promiseStatus]);

    return (
        <Box
            className="LoginForm"
            display="flex"
            flexDirection="column"
            alignItems="center"
            component="form"
            onSubmit={formik.handleSubmit}
        >
            <TextField
                id="username"
                name="username"
                variant={inputVariant}
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
                variant={inputVariant}
                label="Password"
                type={showPassword ? "text" : "password"}
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

            <Stack direction="row" justifyContent="flex-end" sx={{ width: "100%" }}>
                <Button
                    variant={buttonVariant}
                    color="primary"
                    type="submit"
                    disabled={formik.isSubmitting || !formik.isValid}
                    sx={{ mt: 2, mr: 1 }}
                >
                    Войти
                </Button>

                {onRegisterButtonClick ? (
                    <Button variant={buttonVariant} onClick={onRegisterButtonClick} sx={{ mt: 2 }}>
                        Регистрация
                    </Button>
                ) : (
                    ""
                )}
            </Stack>
        </Box>
    );
};

export const CLoginForm = connect(
    (state) => ({ promiseStatus: state.promise?.login?.status || null, serverErrors: state.promise?.login?.error || [] }),
    { onLogin: (login, password) => actionLogin(login, password) }
)(LoginForm);
