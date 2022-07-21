import { connect } from "react-redux";
import { useState, useEffect, useContext } from "react";
import { actionPromiseClear } from "../../../reducers";
import Select from "react-select";
import { actionGoodUpdate } from "../../../actions/actionGoodUpdate";
import { EntityEditor } from "../../common/EntityEditor";
import { actionUploadFiles } from "../../../actions/actionUploadFiles";
import { UIContext } from "../../UIContext";
import { Box, Button, InputLabel, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ConfirmModal } from "../../common/ConfirmModal";
import { actionGoodDelete } from "../../../actions/actionGoodDelete";
import { useNavigate } from "react-router-dom";

const goodSchema = Yup.object().shape({
    name: Yup.string().required("Обов'язкове"),
    description: Yup.string().required("Обов'язкове"),
    price: Yup.number().min(0, "більше або равно 0").required("Обов'язкове"),
    amount: Yup.number().min(0, "більше або равно 0").required("Обов'язкове"),
});

const CGoodEditor = connect(
    (state) => ({
        entity: state.promise?.adminGoodById?.payload || {},
        uploadFiles: state.promise?.uploadFiles,
    }),
    {
        onFileDrop: (files) => actionUploadFiles(files),
    }
)(EntityEditor);

export const GoodForm = ({
    serverErrors = [],
    onSaveClick,
    onSave,
    onClose,
    onDelete,

    promiseStatus,
    deletePromiseStatus,
    catList = [],
    good = {},
} = {}) => {
    const [inputCategories, setInputCategories] = useState([]);
    const [inputImages, setInputImages] = useState([]);
    const { setAlert } = useContext(UIContext);
    const [isNew, setIsNew] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [promiseTimeOut, setPromiseTimeOut] = useState(null);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            price: 0,
            amount: 0,
        },
        validationSchema: goodSchema,
        validateOnBlur: false,
        validateOnChange: true,
        onSubmit: () => {
            let goodToSave = {};
            !isNew && good?._id && (goodToSave._id = good._id);
            goodToSave.name = formik.values.name;
            goodToSave.description = formik.values.description;
            goodToSave.price = +formik.values.price;
            goodToSave.amount = +formik.values.amount;
            goodToSave.categories = inputCategories;
            goodToSave.images = inputImages?.map(({ _id }) => ({ _id })) || [];
            onSaveClick && onSaveClick();
            onSave(goodToSave);
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

    useEffect(() => {
        if (deletePromiseStatus === "FULFILLED") {
            promiseTimeOut && clearTimeout(promiseTimeOut);
            setPromiseTimeOut(null);
            navigate("/admin/goods/");
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
        return () => {};
    }, [deletePromiseStatus]);

    useEffect(() => {
        setInputCategories(good?.categories || []);
        setInputImages(good?.images || []);
        formik.setFieldValue("name", good.name || "");
        formik.setFieldValue("description", good.description || "");
        formik.setFieldValue("amount", good.amount || 0);
        formik.setFieldValue("price", good.price || 0);
    }, [good.categories, good.name, good.description, good.amount, good.price]);

    useEffect(() => {
        return () => {
            onClose && onClose();
        };
    }, []);

    return (
        <Box className="GoodForm" component="form" onSubmit={formik.handleSubmit}>
            <TextField
                id="name"
                name="name"
                variant="outlined"
                label="Назва"
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

            <Box sx={{ mt: 3 }}>
                <InputLabel>Зображення</InputLabel>
                <CGoodEditor onImagesSave={(images) => setInputImages(images)} />
            </Box>

            <TextField
                variant="outlined"
                id="description"
                name="description"
                label="Опис"
                size="small"
                error={formik.touched.description && Boolean(formik.errors.description)}
                value={formik.values.description}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={formik.touched.description && formik.errors.description}
                multiline
                fullWidth
                sx={{ mt: 2 }}
            />

            <Box sx={{ mt: 3 }}>
                <TextField
                    variant="outlined"
                    id="price"
                    name="price"
                    label="Ціна"
                    size="small"
                    error={formik.touched.price && Boolean(formik.errors.price)}
                    value={formik.values.price}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    helperText={formik.touched.price && formik.errors.price}
                    multiline
                    fullWidth
                    sx={{ mt: 2 }}
                />
            </Box>

            <Box sx={{ mt: 3 }}>
                <TextField
                    variant="outlined"
                    id="amount"
                    name="amount"
                    label="Кількість"
                    size="small"
                    error={formik.touched.amount && Boolean(formik.errors.amount)}
                    value={formik.values.amount}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    helperText={formik.touched.amount && formik.errors.amount}
                    multiline
                    fullWidth
                    sx={{ mt: 2 }}
                />
            </Box>

            <Box sx={{ mt: 3 }}>
                <InputLabel>Категорії</InputLabel>
                <Select
                    placeholder="Обрати категорії"
                    value={inputCategories.map(({ _id, name }) => ({ value: _id, label: name }))}
                    closeMenuOnSelect={false}
                    onChange={(e) => setInputCategories(e.map(({ label, value }) => ({ _id: value, name: label })))}
                    options={catList?.map(({ _id, name }) => ({ value: _id, label: name }))}
                    isMulti={true}
                />
            </Box>

            <Stack direction="row" sx={{ mt: 3 }} justifyContent="flex-end" spacing={1}>
                {!!good._id && (
                    <>
                        <Button variant="contained" onClick={() => setIsDeleteModalOpen(true)} disabled={formik.isSubmitting} color="error">
                            Видалити
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => setIsNew(true)}
                            disabled={!formik.isValid || formik.isSubmitting}
                            type="submit"
                        >
                            Зберегти як новий
                        </Button>
                    </>
                )}
                <Button variant="contained" onClick={() => setIsNew(false)} disabled={!formik.isValid || formik.isSubmitting} type="submit">
                    Зберегти
                </Button>
            </Stack>
            {!!good._id && (
                <ConfirmModal
                    open={isDeleteModalOpen}
                    text="Видалити товар?"
                    onClose={() => setIsDeleteModalOpen(false)}
                    onNO={() => setIsDeleteModalOpen(false)}
                    onYES={() => {
                        onDelete(good);
                        setPromiseTimeOut(setTimeout(() => formik.setSubmitting(false), 3000));
                    }}
                />
            )}
        </Box>
    );
};

export const CGoodForm = connect(
    (state) => ({
        catList: state.promise.catAll?.payload || [],
        promiseStatus: state.promise.goodUpsert?.status || null,
        deletePromiseStatus: state.promise.goodDelete?.status || null,
        good: state.promise?.adminGoodById?.payload || {},
        serverErrors: state.promise?.goodUpsert?.error || [],
    }),
    {
        onSave: (good) => actionGoodUpdate(good),
        onClose: () => actionPromiseClear("goodUpsert"),
        onDelete: (good) => actionGoodDelete({ good }),
    }
)(GoodForm);
