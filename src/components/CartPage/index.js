import { Box, Button, Stack, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { actionNewOrder } from '../../actions/actionNewOrder';
import { actionCartDelete } from '../../reducers';
import { CartItem } from './CartItem';
import { OrderForm } from './OrderForm';

export const CartPage = () => {
    const cart = useSelector((state) => state.cart || {});
    const sum = Object.entries(cart).reduce((prev, [_id, order]) => prev + order.count * order.good.price, 0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!Object.entries(cart).length) {
            navigate('/');
        }
    }, []);

    return (
        <Box className="CartPage">
            <Stack spacing={2}>
                <Typography>Оформлення замовлення</Typography>
                <Table className="table">
                    <TableBody>
                        {Object.entries(cart).map(([_id, order]) => (
                            <CartItem order={order} onDeleteClick={(good) => dispatch(actionCartDelete(good))} />
                        ))}

                        <TableRow>
                            <TableCell colSpan={3}>
                                <Typography variant="body1" bold>
                                    Всього:
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography textAlign="center">{sum}</Typography>
                            </TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <OrderForm />
            </Stack>
        </Box>
    );
};
