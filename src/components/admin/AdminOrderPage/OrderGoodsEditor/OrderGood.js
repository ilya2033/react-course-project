import { IconButton, Stack, TableCell, TableRow, Typography } from "@mui/material";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

export const OrderGood = ({ orderGood, onChange }) => {
    return (
        <TableRow>
            <TableCell>{orderGood.good.name}</TableCell>
            <TableCell>
                <Stack justifyContent="center" direction="row" alignItems="center">
                    <IconButton
                        onClick={() => {
                            orderGood.count -= 1;
                            onChange(orderGood);
                        }}
                    >
                        <AiOutlineMinus />
                    </IconButton>
                    <Typography>{orderGood.count}</Typography>
                    <IconButton
                        onClick={() => {
                            orderGood.count += 1;
                            onChange(orderGood);
                        }}
                    >
                        <AiOutlinePlus />
                    </IconButton>
                </Stack>
            </TableCell>
        </TableRow>
    );
};
