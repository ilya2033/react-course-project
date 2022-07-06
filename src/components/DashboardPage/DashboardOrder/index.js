import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import { statusNumber } from "../../../helpers";
import { DashboardOrderGood } from "./DashboardOrderGood";

export const DashboardOrder = ({ order }) => {
    const { price = null, createdAt, orderGoods = [], status } = order || {};
    return (
        <Paper className="DashboardOrder">
            <Stack direction="vertical" justifyContent="space-between" className="title">
                <Typography textAlign="left">Дата: {new Date(+createdAt * 1000).toLocaleDateString()}</Typography>
                <Typography textAlign="left">Сума: {price || " - "}</Typography>
                <Typography textAlign="left">Статус: {"" + status?.length ? statusNumber[+order.status] : "-"}</Typography>
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
