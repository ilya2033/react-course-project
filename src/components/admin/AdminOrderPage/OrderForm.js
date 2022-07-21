import { connect, useSelector } from "react-redux";
import { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { actionOrderUpdate } from "../../../actions/actionOrderUpdate";
import { UIContext } from "../../UIContext";
import { Box, Button, Grid, InputLabel, Stack } from "@mui/material";
import { useFormik } from "formik";
import { statusNumber, statusOptions } from "../../../helpers";
import { OrderGoodsEditor } from "./OrderGoodsEditor";
import { useNavigate } from "react-router-dom";
import { actionOrderDelete } from "../../../actions/actionOrderDelete";
import { ConfirmModal } from "../../common/ConfirmModal";
import { actionPromisesClear } from "../../../actions/actionPromisesClear";

export const OrderForm = ({
    serverErrors = [],
    onSaveClick,
    onSave,
    onClose,
    onDelete,
    userList,
    promiseStatus,
    deletePromiseStatus,
    order = {},
} = {}) => {
    const [inputStatus, setInputStatus] = useState(null);
    const [inputUser, setInputUser] = useState({});
    const { setAlert } = useContext(UIContext);
    const goodList = useSelector((state) => state.promise?.goodsAll?.payload || []);
    const [inputOrderGoods, setInputOrderGoods] = useState([]);
    const [isNew, setIsNew] = useState(false);
    const [promiseTimeOut, setPromiseTimeOut] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {},
        validateOnMount: true,
        onSubmit: () => {
            let orderToSave = {};
            !isNew && order?._id && (orderToSave._id = order._id);
            orderToSave.status = inputStatus;
            inputUser && (orderToSave.owner = inputUser);
            orderToSave.orderGoods = inputOrderGoods;
            onSaveClick && onSaveClick();
            onSave(orderToSave);
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
        setInputStatus(order?.status || null);
        setInputUser(order?.owner || null);
        setInputOrderGoods(order.orderGoods || []);
    }, [order]);

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
            formik.setSubmitting(false);
            promiseTimeOut && clearTimeout(promiseTimeOut);
            setPromiseTimeOut(null);

            navigate("/admin/orders/");
        }
        if (deletePromiseStatus === "REJECTED") {
            formik.setSubmitting(false);
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
        return () => {
            onClose && onClose();
        };
    }, []);

    return (
        <Box className="OrderForm" component="form" onSubmit={formik.handleSubmit}>
            <Grid container spacing={5}>
                <Grid item xs={6}>
                    <Box sx={{ mt: 3 }}>
                        <InputLabel className="form-label">Статус</InputLabel>
                        <Select
                            value={{
                                value: inputStatus || null,
                                label: inputStatus ? statusNumber[inputStatus] : null,
                            }}
                            onChange={(e) => setInputStatus(e.value)}
                            options={statusOptions}
                        />
                    </Box>

                    <Box sx={{ mt: 3 }}>
                        <InputLabel className="form-label">Товари</InputLabel>
                        <OrderGoodsEditor
                            orderGoods={inputOrderGoods}
                            goodList={goodList}
                            onChange={(orderGoods) => {
                                setInputOrderGoods([...orderGoods]);
                            }}
                        />
                    </Box>
                    <Stack direction="row" sx={{ mt: 3 }} justifyContent="flex-end" spacing={1}>
                        {!!order._id && (
                            <>
                                <Button
                                    variant="contained"
                                    onClick={() => setIsDeleteModalOpen(true)}
                                    disabled={formik.isSubmitting}
                                    color="error"
                                >
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
                        <Button
                            variant="contained"
                            onClick={() => setIsNew(false)}
                            disabled={!formik.isValid || formik.isSubmitting}
                            type="submit"
                        >
                            Зберегти
                        </Button>
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <Box sx={{ mt: 3 }}>
                        <InputLabel className="form-label">Користувач</InputLabel>
                        <Select
                            value={{ value: inputUser?._id || null, label: inputUser?.username || "null" }}
                            onChange={(e) => setInputUser({ _id: e.value, username: e.label })}
                            options={userList.map(({ _id, username }) => ({ value: _id, label: username }))}
                        />
                    </Box>
                </Grid>
            </Grid>

            {!!order._id && (
                <ConfirmModal
                    open={isDeleteModalOpen}
                    text="Видалити замовлення?"
                    onClose={() => setIsDeleteModalOpen(false)}
                    onNO={() => setIsDeleteModalOpen(false)}
                    onYES={() => {
                        onDelete(order);
                    }}
                />
            )}
        </Box>
    );
};

export const COrderForm = connect(
    (state) => ({
        promiseStatus: state.promise.orderUpsert?.status || null,
        serverErrors: state.promise.orderUpsert?.error || null,
        order: state.promise?.adminOrderById?.payload || {},
        userList: state.promise.adminUsersAll?.payload || [],
        deletePromiseStatus: state.promise.orderDelete?.status || null,
    }),
    {
        onSave: (order) => actionOrderUpdate(order),
        onClose: () => actionPromisesClear(["orderUpsert", "orderDelete"]),
        onDelete: (order) => actionOrderDelete({ order }),
    }
)(OrderForm);
