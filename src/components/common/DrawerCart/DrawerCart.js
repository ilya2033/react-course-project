import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

import { Divider, Typography, Button, Stack, IconButton } from "@mui/material";
import { DrawerCartItem } from "./DrawerCartItem";
import { DrawerRight } from "../DrawerRight";
import { Box } from "@mui/system";
import { connect } from "react-redux";
import { actionCartDelete } from "../../../reducers";

export const DrawerCart = ({ cart = {}, isOpen = false, onClose = null, onDeleteClick } = {}) => {
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
                        <DrawerCartItem order={order} onDeleteClick={(good) => onDeleteClick(good)} key={_id} />
                    ))}

                    {!!Object.keys(cart).length && (
                        <Button
                            variant="text"
                            onClick={() => {
                                onClose();
                                navigate("/cart");
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

export const CDrawerCart = connect((state) => ({ cart: state.cart || {} }), {
    onDeleteClick: (good) => actionCartDelete(good),
})(DrawerCart);
