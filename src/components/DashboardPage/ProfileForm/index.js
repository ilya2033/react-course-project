import { Box, Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableRow, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";

import { connect } from "react-redux";
import { actionUpdateAvatar } from "../../../actions/actionUpdateAvatar";
import { actionUserUpdate } from "../../../actions/actionUserUpdate";
import { Ava } from "../../common/Ava";
import { DropZone } from "../../common/DropZone";
import { CProfileImage } from "./ProfileImage";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UIContext } from "../../UIContext";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const CDropZone = connect(null, { onFileDrop: (acceptedFiles) => actionUpdateAvatar(acceptedFiles[0]) })(DropZone);

const profileSchema = Yup.object().shape({
    name: Yup.string(),
    username: Yup.string().min(3, "Too Short!").max(15, "Too Long!").required("Required"),
    password: Yup.string().min(3, "Too Short!").max(15, "Too Long!"),
    nick: Yup.string(),
});

export const ProfileForm = ({ profile = {}, promiseStatus, onProfileSave, serverErrors = [] } = {}) => {
    const [isLetterShown, setIsLetterShown] = useState(false);
    const [editMod, setEditMod] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { setAlert } = useContext(UIContext);
    const [promiseTimeOut, setPromiseTimeOut] = useState(null);

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            repeatPassword: "",
        },
        validationSchema: profileSchema,
        validateOnChange: true,
        onSubmit: () => {
            onProfileSave(formik.values);
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
        formik.setValues(profile);

        return () => {
            promiseTimeOut && clearTimeout(promiseTimeOut);
            setPromiseTimeOut(null);
        };
    }, [profile]);

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
        <Box component="form" className="ProfileForm" onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
                <Grid xs={4} item>
                    <CDropZone>
                        <Box
                            className="profileImageWrapper"
                            onMouseEnter={() => setIsLetterShown(true)}
                            onMouseLeave={() => setIsLetterShown(false)}
                        >
                            <CProfileImage />
                            <Box className={`letter ${isLetterShown && "show"}`}>Drop file or click to update</Box>
                        </Box>
                    </CDropZone>
                </Grid>
                <Grid xs={8} item>
                    <Table justify>
                        <TableBody>
                            <TableRow>
                                <TableCell>Username</TableCell>
                                <TableCell>
                                    {editMod ? (
                                        <TextField
                                            size="small"
                                            id="username"
                                            name="username"
                                            variant="standard"
                                            label="Username"
                                            error={formik.touched.username && Boolean(formik.errors.username)}
                                            value={formik.values.username}
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            helperText={formik.touched.username && formik.errors.username}
                                        />
                                    ) : (
                                        formik.values.username
                                    )}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Nick</TableCell>
                                <TableCell>
                                    {editMod ? (
                                        <TextField
                                            size="small"
                                            id="nick"
                                            name="nick"
                                            variant="standard"
                                            label="Nick"
                                            error={formik.touched.nick && Boolean(formik.errors.nick)}
                                            value={formik.values.nick}
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            helperText={formik.touched.nick && formik.errors.nick}
                                        />
                                    ) : (
                                        formik.values.nick
                                    )}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>
                                    {editMod ? (
                                        <TextField
                                            size="small"
                                            id="name"
                                            name="name"
                                            variant="standard"
                                            label="Name"
                                            error={formik.touched.name && Boolean(formik.errors.name)}
                                            value={formik.values.name}
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            helperText={formik.touched.name && formik.errors.name}
                                        />
                                    ) : (
                                        formik.values.name
                                    )}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Password</TableCell>
                                <TableCell>
                                    {editMod ? (
                                        <TextField
                                            size="small"
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
                                        />
                                    ) : (
                                        "****************"
                                    )}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>
                                    {editMod ? (
                                        <Box display="flex" justifyContent="flex-end">
                                            <Button variant="text" color="error" onClick={() => setEditMod(false)}>
                                                Скасувати
                                            </Button>
                                            <Button
                                                variant="text"
                                                color="primary"
                                                type="submit"
                                                disabled={formik.isSubmitting || !formik.isValid}
                                            >
                                                Зберегти
                                            </Button>
                                        </Box>
                                    ) : (
                                        <Box display="flex" justifyContent="flex-end">
                                            <Button onClick={() => setEditMod(true)}>Редагувати</Button>
                                        </Box>
                                    )}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Grid>
            </Grid>
        </Box>
    );
};

export const CProfileForm = connect(
    (state) => ({
        profile: state.promise?.aboutMe?.payload,
        promiseStatus: state.promise.userUpsert?.status || null,
        serverErrors: state.promise?.userUpsert?.error || [],
    }),
    {
        onProfileSave: (profile = {}) => actionUserUpdate(profile),
    }
)(ProfileForm);
