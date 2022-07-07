import { Box } from "@mui/material";
import { COrderForm } from "./OrderForm";
import { connect } from "react-redux";

export const AdminOrderPage = ({ order }) => (
    <Box className="AdminOrderPage">
        <COrderForm order={order} />
    </Box>
);
export const CAdminOrderPage = connect((state) => ({ order: state.promise?.adminOrderById?.payload || {} }))(AdminOrderPage);
