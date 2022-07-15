import { Box, Button, Stack, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actionOrderUpdate } from "../../actions/actionOrderUpdate";
import { actionCartDelete } from "../../reducers";
import { UIContext } from "../UIContext";
import { CartItem } from "./CartItem";

export const CartPage = ({ onConfirm, promiseStatus, serverErrors, onDeleteClick }) => {
    const cart = useSelector((state) => state.cart || {});
    const { setAlert } = useContext(UIContext);
    const sum = Object.entries(cart).reduce((prev, [_id, order]) => prev + order.count * order.good.price, 0);
    const [promiseTimeOut, setPromiseTimeOut] = useState(null);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {},
        onSubmit: () => {
            setPromiseTimeOut(setTimeout(() => formik.setSubmitting(false), 3000));
            onConfirm && Object.keys(cart).length && onConfirm({ orderGoods: Object.values(cart) });
        },
    });

    useEffect(() => {
        if (!Object.entries(cart).length) {
            navigate("/");
        }
        return () => {
            promiseTimeOut && clearTimeout(promiseTimeOut);
        };
    }, []);

    useEffect(() => {
        !Object.keys(cart).length && navigate("/");
    }, [cart]);

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
        <Box className="CartPage" component="form" onSubmit={formik.handleSubmit}>
            <Stack spacing={2}>
                <Typography>Оформлення замовлення</Typography>
                <Table className="table">
                    <TableBody>
                        {Object.entries(cart).map(([_id, order]) => (
                            <CartItem order={order} onDeleteClick={(good) => onDeleteClick(good)} key={_id} />
                        ))}

                        <TableRow>
                            <TableCell colSpan={3}>
                                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                                    Всього:
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography textAlign="center">{sum} ₴</Typography>
                            </TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={4}></TableCell>

                            <TableCell>
                                <Button variant="contained" disabled={formik.isSubmitting} type="submit">
                                    Підтвердити
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Stack>
        </Box>
    );
};

export const CCartPage = connect(
    (state) => ({
        promiseStatus: state.promise.orderUpsert?.status || null,
        serverErrors: state.promise.orderUpsert?.error || null,
    }),
    {
        onConfirm: (order) => actionOrderUpdate(order),
        onDeleteClick: (good) => actionCartDelete(good),
    }
)(CartPage);
