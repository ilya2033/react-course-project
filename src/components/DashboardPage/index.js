import { Box, Paper, Stack, Typography } from "@mui/material";
import { connect } from "react-redux";
import { Error } from "../common/Error";
import { DashboardOrder } from "./DashboardOrder";
import { CProfileForm } from "./ProfileForm";

export const DashboardPage = ({ orders = [] }) => {
    return (
        <Stack className="DashboardPage" spacing={4}>
            <Paper className="Paper">
                <CProfileForm />
            </Paper>
            {!!orders.length ? (
                <Box mt={2}>
                    <Typography pb={2} variant="h5">
                        Замовлення
                    </Typography>
                    {orders.map((order) => (
                        <DashboardOrder order={order} key={order._id} />
                    ))}
                </Box>
            ) : (
                ""
            )}
        </Stack>
    );
};

export const CDashboardPage = connect((state) => ({ orders: state.promise?.orders?.payload || [] }))(DashboardPage);
