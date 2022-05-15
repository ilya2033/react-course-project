import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { actionPromise, actionPromiseClear } from '../../../reducers';
import Select from 'react-select';
import { actionGoodUpdate } from '../../../actions/actionGoodUpdate';
import { EntityEditor } from '../../common/EntityEditor';
import { actionUploadFiles } from '../../../actions/actionUploadFiles';
import {
    Box,
    Button,
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Stack,
    TextareaAutosize,
    TextField,
    Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Error } from '../../common/Error';

const goodSchema = Yup.object().shape({
    name: Yup.string().required("Обов'язкове"),
    description: Yup.string().required("Обов'язкове"),
    price: Yup.number().min(0, 'більше або равно 0').required("Обов'язкове"),
    amount: Yup.number().min(0, 'більше або равно 0').required("Обов'язкове"),
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
    serverErrors,
    onSaveClick,
    onSave,
    onClose,
    promiseStatus,
    catList = [],
    good = {},
} = {}) => {
    const [inputCategories, setInputCategories] = useState([]);
    const [inputImages, setInputImages] = useState([]);

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            price: 0,
            amount: 0,
        },
        validationSchema: goodSchema,
        validateOnChange: true,
        onSubmit: () => {
            let goodToSave = {};
            good?._id && (goodToSave._id = good._id);
            goodToSave.name = formik.values.name;
            goodToSave.description = formik.values.description;
            goodToSave.price = +formik.values.price;
            goodToSave.amount = +formik.values.amount;
            goodToSave.categories = inputCategories;
            goodToSave.images = inputImages?.map(({ _id }) => ({ _id })) || [];

            onSaveClick && onSaveClick();
            onSave(goodToSave);
        },
    });

    useEffect(() => {
        setInputCategories(good?.categories || []);
        setInputImages(good?.images || []);
        formik.setFieldValue('name', good.name || '');
        formik.setFieldValue('description', good.description || '');
        formik.setFieldValue('amount', good.amount || 0);
        formik.setFieldValue('price', good.price || 0);
    }, [good]);

    useEffect(() => {
        return () => {
            onClose && onClose();
        };
    }, []);
    return (
        <Box className="GoodForm" component="form" onSubmit={formik.handleSubmit}>
            {(serverErrors || []).map((error) => (
                <Error>{error?.message}</Error>
            ))}

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
                <InputLabel>Категорії</InputLabel>
                <Select
                    placeholder="Обрати категорії"
                    value={inputCategories.map(({ _id, name }) => ({ value: _id, label: name }))}
                    closeMenuOnSelect={false}
                    onChange={(e) => setInputCategories(e.map(({ label, value }) => ({ _id: value, name: label })))}
                    options={catList?.map(({ _id, name }) => ({ value: _id, label: name }))}
                    isMulti={true}
                />
                {/* <TextField
                        classes={{ root: classes.root }}
                        select
                        name="userRoles"
                        id="userRoles"
                        variant="outlined"
                        label="userRoles"
                        SelectProps={{
                            multiple: true,
                            value: formState.userRoles,
                            onChange: catList?.map(({ _id, name }) => ({ value: _id, label: name })),
                        }}
                    >
                        {catList?.map(({ _id, name }) => ({ value: _id, label: name }))}
                    </TextField> */}
            </Box>

            <Box direction="row" sx={{ mt: 3 }} justifyContent="flex-end">
                <Button variant="contained" disabled={!formik.isValid || formik.isSubmitting} type="submit" fullWidth>
                    Зберегти
                </Button>
            </Box>
        </Box>
    );
};

export const CGoodForm = connect(
    (state) => ({
        catList: state.promise.catAll?.payload || [],
        promiseStatus: state.promise.goodUpsert?.status || null,
        good: state.promise?.adminGoodById?.payload || {},
    }),
    {
        onSave: (good) => actionGoodUpdate(good),
        onClose: () => actionPromiseClear('goodUpsert'),
    }
)(GoodForm);
