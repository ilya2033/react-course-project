import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { actionCategoryUpdate } from '../../../actions/actionCategoryUpdate';
import { actionPromise, actionPromiseClear, store } from '../../../reducers';
import { Box, Button, InputLabel, Stack, TextField, Typography } from '@mui/material';

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
    const [inputSubCategories, setInputSubCategories] = useState([]);
    const [inputGoods, setInputGoods] = useState([]);
    const [inputParent, setInputParent] = useState({});
    const [subCatList, setSubCatList] = useState([]);
    const [parentList, setParentList] = useState([]);

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

            categoryToSave.subCategories = inputSubCategories;
            onSaveClick && onSaveClick();
            onSave(categoryToSave);
        },
    });

    useEffect(() => {
        setInputParent(category?.parent || null);
        setInputGoods(category?.goods || []);
        setInputSubCategories(category?.subCategories || []);
    }, []);

    useEffect(() => {
        let parentList = initialCatList.filter(
            ({ _id }) =>
                !category?.subCatergories?.find((subCat) => _id === subCat._id) &&
                _id !== category?._id &&
                !inputSubCategories?.find((subCat) => _id === subCat._id)
        );
        parentList = [...[{ _id: null, name: 'null' }], ...parentList];

        setParentList(parentList);
    }, [inputSubCategories]);

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
                    value={inputSubCategories?.map(({ _id, name }) => ({ value: _id, label: name }))}
                    closeMenuOnSelect={false}
                    onChange={(e) => setInputSubCategories(e.map(({ value, label }) => ({ _id: value, name: label })))}
                    options={subCatList?.map(({ _id, name }) => ({ value: _id, label: name }))}
                    isMulti={true}
                />
            </Box>
            {goodsField && (
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
            )}

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
