import { connect } from "react-redux";
import { useState, useEffect, useContext } from "react";
import { actionUserUpdate } from "../../../actions/actionUserUpdate";
import { UIContext } from "../../UIContext";
import Select from "react-select";
import { Box, Button, Grid, IconButton, InputLabel, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { aclList } from "../../../helpers";
import { actionUploadFile } from "../../../actions/actionUploadFile";
import { ProfileImageEditor } from "../../common/ProfileImageEditor";
import { actionPromisesClear } from "../../../actions/actionPromisesClear";

const CProfileImageEditor = connect(null, {
    onFileDrop: (acceptedFiles) => actionUploadFile(acceptedFiles[0]),
})(ProfileImageEditor);

const userSchema = Yup.object().shape({
    name: Yup.string(),
    username: Yup.string().min(3, "Too Short!").max(15, "Too Long!").required("Required"),
    password: Yup.string().min(3, "Too Short!").max(15, "Too Long!"),
    nick: Yup.string(),
});

export const UserForm = ({
    serverErrors = [],
    onSaveClick,
    onSave,
    onClose,
    onUnmount,
    promiseStatus,
    deletePromiseStatus,
    avatar = null,
    user = {},
} = {}) => {
    const { setAlert } = useContext(UIContext);
    const [promiseTimeOut, setPromiseTimeOut] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const [acl, setAcl] = useState([]);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: "",
            username: "",
            nick: "",
            password: "",
        },
        validationSchema: userSchema,
        validateOnChange: true,
        onSubmit: () => {
            let userToSave = {};
            userToSave = formik.values;
            user?._id && (userToSave._id = user._id);
            userToSave.acl = acl;
            avatar ? (userToSave.avatar = avatar) : delete userToSave.avatar;
            onSaveClick && onSaveClick();
            onSave(userToSave);
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

    useEffect(() => {
        if (deletePromiseStatus === "FULFILLED") {
            promiseTimeOut && clearTimeout(promiseTimeOut);
            setPromiseTimeOut(null);
            navigate("/admin/users/");
        }
        if (deletePromiseStatus === "REJECTED") {
            promiseTimeOut && clearTimeout(promiseTimeOut);
            setPromiseTimeOut(null);
            setAlert({
                show: true,
                severity: "error",
                message: "Помилка",
            });
        }
        return () => {
            onUnmount && onUnmount();
        };
    }, [deletePromiseStatus]);

    useEffect(() => {
        setAcl(user?.acl || []);
        formik.setFieldValue("name", user.name || "");
        formik.setFieldValue("username", user.username || "");
        formik.setFieldValue("nick", user.nick || "");
        formik.setFieldValue("password", user.password || "");
        formik.validateForm();
    }, [user]);

    useEffect(() => {
        return () => {
            onClose && onClose();
        };
    }, []);

    return (
        <Box className="UserForm" component="form" onSubmit={formik.handleSubmit}>
            <Grid container>
                <Grid item xs={5}>
                    <CProfileImageEditor avatar={avatar} />
                </Grid>
                <Grid item xs={7}>
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
                        multiline
                        fullWidth
                        sx={{ mt: 2 }}
                    />

                    <TextField
                        variant="outlined"
                        id="username"
                        name="username"
                        label="Username"
                        size="small"
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        value={formik.values.username}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        helperText={formik.touched.username && formik.errors.username}
                        multiline
                        fullWidth
                        sx={{ mt: 2 }}
                    />

                    <TextField
                        variant="outlined"
                        id="nick"
                        name="nick"
                        label="Nick"
                        size="small"
                        error={formik.touched.nick && Boolean(formik.errors.nick)}
                        value={formik.values.nick}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        helperText={formik.touched.nick && formik.errors.nick}
                        multiline
                        fullWidth
                        sx={{ mt: 2 }}
                    />

                    <TextField
                        id="password"
                        name="password"
                        variant="outlined"
                        size="small"
                        label="Новий пароль"
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
                    <Box sx={{ mt: 3 }}>
                        <InputLabel>Permissions</InputLabel>
                        <Select
                            placeholder="Обрати категорії"
                            value={acl.map((value) => ({ value, label: value }))}
                            closeMenuOnSelect={false}
                            onChange={(e) => setAcl(e.map(({ value }) => value))}
                            options={aclList}
                            isMulti={true}
                        />
                    </Box>
                </Grid>
            </Grid>

            <Stack direction="row" sx={{ mt: 3 }} justifyContent="flex-end" spacing={1}>
                <Button variant="contained" disabled={!formik.isValid || formik.isSubmitting} type="submit">
                    Зберегти
                </Button>
            </Stack>
        </Box>
    );
};

export const CUserForm = connect(
    (state) => ({
        promiseStatus: state.promise.userUpsert?.status || null,
        deletePromiseStatus: state.promise.userDelete?.status || null,
        user: state.promise?.adminUserById?.payload || {},
        avatar: state.promise?.uploadFile?.payload || state.promise?.adminUserById?.payload?.avatar || null,
        serverErrors: state.promise?.userUpsert?.error || [],
    }),
    {
        onSave: (user) => actionUserUpdate(user),
        onClose: () => actionPromisesClear(["userUpsert", "userDelete"]),
    }
)(UserForm);
