import { Box } from "@mui/system";
import defaultGoodImage from "../../images/default-good-image.png";
import { IoCloseOutline } from "react-icons/io5";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { actionCartChange } from "../../reducers";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { backendURL } from "../../helpers";

const { Typography, Stack, IconButton, TextField, ButtonGroup, Button, TableCell, TableRow, Input } = require("@mui/material");

export const CartItem = ({ order, onDeleteClick }) => {
    const { good, count = 1 } = order || {};
    const { _id, images = [], name = "", price = 0, amount = 1 } = good;

    const dispatch = useDispatch();
    const [countInput, setCountInput] = useState(count || 1);

    useEffect(() => {
        setCountInput(+count);
    }, [count]);

    useEffect(() => {
        dispatch(actionCartChange(good, +countInput));
    }, [countInput]);

    const handleChange = (count) => {
        if (count >= 0 && count <= 99 && count <= amount) {
            setCountInput(+count);
        }
    };

    return (
        <TableRow className="CartItem">
            <TableCell>
                <Box
                    component="img"
                    src={images && images[0]?.url ? `${backendURL}/${images ? images[0]?.url : ""}` : defaultGoodImage}
                    sx={{ width: 50 }}
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = defaultGoodImage;
                    }}
                />
            </TableCell>
            <TableCell>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h5">{name}</Typography>
                    <Typography variant="body1">{price} ₴</Typography>
                </Box>
            </TableCell>
            <TableCell>
                <Stack justifyContent="center" direction="row" alignItems="center">
                    <IconButton onClick={() => handleChange(countInput - 1)}>
                        <AiOutlineMinus />
                    </IconButton>
                    <Typography>{countInput}</Typography>
                    <IconButton onClick={() => handleChange(countInput + 1)}>
                        <AiOutlinePlus />
                    </IconButton>
                </Stack>
            </TableCell>
            <TableCell>
                <Stack justifyContent="center">
                    <Typography variant="body1" textAlign="center">
                        {price * count} ₴
                    </Typography>
                </Stack>
            </TableCell>
            <TableCell>
                <IconButton onClick={() => onDeleteClick({ _id, images, name, price })}>
                    <IoCloseOutline />
                </IconButton>
            </TableCell>
        </TableRow>
    );
};
