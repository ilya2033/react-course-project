import { connect } from "react-redux";
import { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { actionCategoryUpdate } from "../../../actions/actionCategoryUpdate";
import { Box, Button, InputLabel, Stack, TextField } from "@mui/material";
import { UIContext } from "../../UIContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ConfirmModal } from "../../common/ConfirmModal";
import { useNavigate } from "react-router-dom";
import { actionCategoryDelete } from "../../../actions/actionCategoryDelete";
import { actionPromisesClear } from "../../../actions/actionPromisesClear";

const categorySchema = Yup.object().shape({
    name: Yup.string().required("Обов'язкове"),
});

const CategoryForm = ({
    serverErrors = [],
    onSaveClick,
    onSave,
    onClose,
    onDelete,
    promiseStatus,
    deletePromiseStatus,
    catList: initialCatList = [],
    goodList = [],
    category = {},
} = {}) => {
    const [inputSubcategories, setInputSubcategories] = useState([]);
    const [inputGoods, setInputGoods] = useState([]);
    const [inputParent, setInputParent] = useState({});
    const [subCatList, setSubCatList] = useState([]);
    const [parentList, setParentList] = useState([]);
    const { setAlert } = useContext(UIContext);
    const [isNew, setIsNew] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [promiseTimeOut, setPromiseTimeOut] = useState(null);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: category?.name || "",
        },
        validationSchema: categorySchema,
        validateOnChange: true,
        validateOnMount: true,
        onSubmit: () => {
            let categoryToSave = {};
            !isNew && category?._id && (categoryToSave._id = category?._id);
            categoryToSave.name = formik.values.name;
            inputGoods && (categoryToSave.goods = inputGoods);
            inputParent && (categoryToSave.parent = inputParent._id ? inputParent : null);

            categoryToSave.subcategories = inputSubcategories;
            onSaveClick && onSaveClick();
            onSave(categoryToSave);
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
        formik.setFieldValue("name", category.name || "");
        setInputParent(category?.parent || null);
        setInputGoods(category?.goods || []);
        setInputSubcategories(category?.subcategories || []);
    }, [category]);

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
            navigate("/admin/categories/");
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
    }, [deletePromiseStatus]);

    useEffect(() => {
        let parentList = initialCatList.filter(
            ({ _id }) =>
                !category?.subCatergories?.find((subCat) => _id === subCat._id) &&
                _id !== category?._id &&
                !inputSubcategories?.find((subCat) => _id === subCat._id)
        );
        parentList = [...[{ _id: null, name: "null" }], ...parentList];

        setParentList(parentList);
    }, [inputSubcategories, initialCatList]);

    useEffect(() => {
        let subCatList = initialCatList.filter(
            ({ _id }) => _id !== category?.parent?._id && _id !== category?._id && inputParent?._id !== _id
        );

        setSubCatList(subCatList);
    }, [inputParent, initialCatList]);

    useEffect(() => {
        return () => {
            onClose && onClose();
        };
    }, []);

    return (
        <Box className="CategoryForm" component="form" onSubmit={formik.handleSubmit}>
            <Box>
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
            </Box>
            <Box sx={{ mt: 3 }}>
                <InputLabel className="form-label">Батьківська категорія</InputLabel>
                <Select
                    value={{ value: inputParent?._id || null, label: inputParent?.name || "null" }}
                    onChange={(e) => setInputParent({ _id: e.value, name: e.label })}
                    options={parentList.map(({ _id, name }) => ({ value: _id, label: name }))}
                />
            </Box>

            <Box sx={{ mt: 3 }}>
                <InputLabel className="form-label">Підкатегорії</InputLabel>
                <Select
                    value={inputSubcategories?.map(({ _id, name }) => ({ value: _id, label: name }))}
                    closeMenuOnSelect={false}
                    onChange={(e) => setInputSubcategories(e.map(({ value, label }) => ({ _id: value, name: label })))}
                    options={subCatList?.map(({ _id, name }) => ({ value: _id, label: name }))}
                    isMulti={true}
                />
            </Box>

            <Box sx={{ mt: 3 }}>
                <InputLabel className="form-label">Товари</InputLabel>
                <Select
                    value={inputGoods?.map(({ _id, name }) => ({ value: _id, label: name }))}
                    closeMenuOnSelect={false}
                    onChange={(e) => setInputGoods(e.map(({ value, label }) => ({ _id: value, name: label })))}
                    options={goodList?.map(({ _id, name }) => ({ value: _id, label: name }))}
                    isMulti={true}
                />
            </Box>
            <Stack direction="row" sx={{ mt: 3 }} justifyContent="flex-end" spacing={1}>
                {!!category._id && (
                    <>
                        <Button variant="contained" onClick={() => setIsDeleteModalOpen(true)} disabled={formik.isSubmitting} color="error">
                            Видалити
                        </Button>
                        <Button variant="contained" onClick={() => setIsNew(true)} disabled={formik.isSubmitting} type="submit">
                            Зберегти як новий
                        </Button>
                    </>
                )}
                <Button variant="contained" onClick={() => setIsNew(false)} disabled={formik.isSubmitting} type="submit">
                    Зберегти
                </Button>
            </Stack>
            {!!category._id && (
                <ConfirmModal
                    open={isDeleteModalOpen}
                    text="Видалити категорію?"
                    onClose={() => setIsDeleteModalOpen(false)}
                    onNO={() => setIsDeleteModalOpen(false)}
                    onYES={() => {
                        onDelete(category);
                        setPromiseTimeOut(setTimeout(() => formik.setSubmitting(false), 3000));
                    }}
                />
            )}
        </Box>
    );
};

export const CCategoryForm = connect(
    (state) => ({
        catList: state.promise.catAll?.payload || [],
        promiseStatus: state.promise.categoryUpsert?.status || null,
        serverErrors: state.promise.categoryUpsert?.error || null,
        goodList: state.promise.goodsAll?.payload || [],
        deletePromiseStatus: state.promise.categoryDelete?.status || null,
    }),
    {
        onSave: (cat) => actionCategoryUpdate(cat),
        onClose: () => actionPromisesClear(["categoryUpsert", "categoryDelete"]),
        onDelete: (category) => actionCategoryDelete({ category }),
    }
)(CategoryForm);
