import { actionNewOrder } from '../../../actions/actionNewOrder';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { actionCartDelete } from '../../../reducers';
import { IoMdClose } from 'react-icons/io';

import {
    List,
    Divider,
    ListItem,
    Typography,
    Button,
    TableRow,
    TableBody,
    Table,
    TableCell,
    Stack,
    ListItemButton,
    IconButton,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { DrawerCartItem } from './DrawerCartItem';
import { DrawerRight } from '../DrawerRight';
import { Box } from '@mui/system';

export const DrawerCart = ({ isOpen = false, onClose = null } = {}) => {
    const cart = useSelector((state) => state.cart || {});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <DrawerRight open={isOpen} onClose={() => onClose()}>
            <Box className="DrawerCart">
                <Stack className="list " spacing={2} px={1}>
                    <Stack spacing={2} direction="row" alignItems="center" justifyContent="space-between" p={1}>
                        <Typography variant="h5" flexGrow="1">
                            Кошик
                        </Typography>
                        <IconButton onClick={onClose}>
                            <IoMdClose />
                        </IconButton>
                    </Stack>

                    <Divider />
                    {Object.entries(cart).map(([_id, order]) => (
                        <DrawerCartItem
                            order={order}
                            onDeleteClick={(good) => dispatch(actionCartDelete(good))}
                            key={_id}
                        />
                    ))}

                    {!!Object.keys(cart).length && (
                        <Button
                            variant="text"
                            onClick={() => {
                                dispatch(actionNewOrder([...Object.values(cart)]));
                                onClose();
                                navigate('/cart');
                            }}
                        >
                            Підтвердити
                        </Button>
                    )}
                </Stack>
            </Box>
        </DrawerRight>
    );
};
