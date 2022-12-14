import { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { actionRegister } from "../../../actions/actionRegister";
import { UIContext } from "../../UIContext";

const signUpSchema = Yup.object().shape({
    username: Yup.string().min(3, "Too Short!").max(15, "Too Long!").required("Required"),
    password: Yup.string().min(3, "Too Short!").max(15, "Too Long!").required("Required"),
    repeatPassword: Yup.string()
        .min(3, "Too Short!")
        .max(15, "Too Long!")
        .required("Required")
        .oneOf([Yup.ref("password")], "Your passwords do not match."),
});

export const RegisterForm = ({ serverErrors, promiseStatus, onRegister, onLoginButtonClick }) => {
    const [showPassword, setShowPassword] = useState(false);
    const { setAlert } = useContext(UIContext);
    const [promiseTimeOut, setPromiseTimeOut] = useState(null);

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            repeatPassword: "",
        },
        validationSchema: signUpSchema,
        validateOnChange: true,
        validateOnMount: true,
        onSubmit: () => {
            onRegister(formik.values.username, formik.values.password);
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
                message: "????????????",
            });
        }
        if (promiseStatus === "REJECTED") {
            const errorMessage = (serverErrors ? [].concat(serverErrors) : []).reduce((prev, curr) => prev + "\n" + curr.message, "");
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
            className="RegisterForm"
            display="flex"
            flexDirection="column"
            alignItems="center"
            component="form"
            onSubmit={formik.handleSubmit}
        >
            <TextField
                id="username"
                name="username"
                variant="standard"
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
                variant="standard"
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

            <TextField
                id="repeatPassword"
                name="repeatPassword"
                variant="standard"
                label="Repeat password"
                type={showPassword ? "text" : "password"}
                error={formik.touched.repeatPassword && Boolean(formik.errors.repeatPassword)}
                value={formik.values.repeatPassword}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={formik.touched.repeatPassword && formik.errors.repeatPassword}
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
                fullWidth
                sx={{ mt: 2 }}
            >
                ??????????????????????????????
            </Button>
            <Button variant="text" onClick={onLoginButtonClick}>
                <Typography>????????????</Typography>
            </Button>
        </Box>
    );
};

export const CRegisterForm = connect(
    (state) => ({ promiseStatus: state.promise?.register?.status || null, serverErrors: state.promise?.register?.error || [] }),
    {
        onRegister: (login, password) => actionRegister(login, password),
    }
)(RegisterForm);
