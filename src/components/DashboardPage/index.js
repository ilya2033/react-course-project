import { Stack } from "@mui/material";
import { connect } from "react-redux";
import { Error } from "../common/Error";
import { DashboardOrder } from "./DashboardOrder";

export const DashboardPage = ({ orders = [] }) => {
    return (
        <Stack className="DashboardPage" spacing={4}>
            {!!orders.length ? orders.map((order) => <DashboardOrder order={order} key={order._id} />) : <Error>Пока пусто </Error>}
        </Stack>
    );
};

export const CDashboardPage = connect((state) => ({ orders: state.promise?.orders?.payload || [] }))(DashboardPage);
