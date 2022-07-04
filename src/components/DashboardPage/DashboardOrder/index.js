import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import { DashboardOrderGood } from "./DashboardOrderGood";

export const DashboardOrder = ({ order }) => {
    const { price = null, createdAt, orderGoods = [] } = order || {};
    return (
        <Paper className="DashboardOrder">
            <Stack direction="vertical" justifyContent="space-between">
                <Typography textAlign="left">Дата: {new Date(+createdAt).toDateString()}</Typography>
                <Typography textAlign="left">Сума: {price || " - "}</Typography>
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Stack spacing={2}>
                {(orderGoods || []).map((orderGood) => (
                    <DashboardOrderGood orderGood={orderGood} key={orderGood._id} />
                ))}
            </Stack>
        </Paper>
    );
};
