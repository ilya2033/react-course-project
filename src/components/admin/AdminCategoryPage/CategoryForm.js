import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { actionCategoryUpdate } from '../../../actions/actionCategoryUpdate';
import { actionPromise, actionPromiseClear, store } from '../../../reducers';
import { Alert, Box, Button, InputLabel, Snackbar, Stack, TextField, Typography } from '@mui/material';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Error } from '../../common/Error';

const categorySchema = Yup.object().shape({
    name: Yup.string().required("Обов'язкове"),
});

const CategoryForm = ({
    serverErrors,
    onSaveClick,
    onSave,
    onClose,
    promiseStatus,
    goodsField = false,
    catList: initialCatList = [],
    goodList = [],
    category = {},
} = {}) => {
    const [inputSubcategories, setInputSubcategories] = useState([]);
    const [inputGoods, setInputGoods] = useState([]);
    const [inputParent, setInputParent] = useState({});
    const [subCatList, setSubCatList] = useState([]);
    const [parentList, setParentList] = useState([]);
    const [snackbar, setSnackbar] = useState({ isOpen: false, message: '', type: 'success' });

    const formik = useFormik({
        initialValues: {
            name: category?.name || '',
        },
        validationSchema: categorySchema,
        validateOnChange: true,
        onSubmit: () => {
            let categoryToSave = {};
            category?._id && (categoryToSave._id = category?._id);
            categoryToSave.name = formik.values.name;
            inputGoods && (categoryToSave.goods = inputGoods);
            inputParent && (categoryToSave.parent = inputParent);

            categoryToSave.subcategories = inputSubcategories;
            onSaveClick && onSaveClick();
            onSave(categoryToSave);
        },
    });

    useEffect(() => {
        formik.setFieldValue('name', category.name || '');
        setInputParent(category?.parent || null);
        setInputGoods(category?.goods || []);
        setInputSubcategories(category?.subcategories || []);
    }, [category]);

    useEffect(() => {
        console.log(promiseStatus);
        if (promiseStatus === 'FULFILLED') {
            formik.setSubmitting(false);
            setSnackbar({ ...snackbar, isOpen: true, message: 'Готово', severity: 'succes' });
        }
        if (promiseStatus === 'REJECTED') {
            const errorMessage = serverErrors.reduce((prev, curr) => prev + '\n' + curr, '');
            formik.setSubmitting(false);
            setSnackbar({ ...snackbar, isOpen: true, message: errorMessage, severity: 'error' });
        }
    }, [promiseStatus]);

    useEffect(() => {
        let parentList = initialCatList.filter(
            ({ _id }) =>
                !category?.subCatergories?.find((subCat) => _id === subCat._id) &&
                _id !== category?._id &&
                !inputSubcategories?.find((subCat) => _id === subCat._id)
        );
        parentList = [...[{ _id: null, name: 'null' }], ...parentList];

        setParentList(parentList);
    }, [inputSubcategories]);

    useEffect(() => {
        let subCatList = initialCatList.filter(
            ({ _id }) => _id !== category?.parent?._id && _id !== category?._id && inputParent?._id !== _id
        );
        setSubCatList(subCatList);
    }, [inputParent]);

    useEffect(() => {
        return () => {
            onClose && onClose();
        };
    }, []);

    return (
        <Box className="CategoryForm" component="form" onSubmit={formik.handleSubmit}>
            {(serverErrors || []).map((error) => (
                <Error>{error?.message}</Error>
            ))}

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
                    value={{ value: inputParent?._id || null, label: inputParent?.name || 'null' }}
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
            {
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
            }
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
            <Box direction="row" sx={{ mt: 3 }} justifyContent="flex-end">
                <Button variant="contained" disabled={!formik.isValid || formik.isSubmitting} type="submit" fullWidth>
                    Зберегти
                </Button>
            </Box>
        </Box>
    );
};

// const CRegisterForm = connect((state) => ({ serverErrors: state.promise?.register?.error || [] }), {
//     onRegister: (login, password) => actionRegister(login, password),
// })(RegisterForm);

export const CCategoryForm = connect(
    (state) => ({
        catList: state.promise.catAll?.payload || [],
        promiseStatus: state.promise.categoryUpsert?.status || null,
        goodList: state.promise.goodsAll?.payload || [],
    }),
    {
        onSave: (cat) => actionCategoryUpdate(cat),
        onClose: () => actionPromiseClear('categoryUpsert'),
    }
)(CategoryForm);
