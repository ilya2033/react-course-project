import { Box } from "@mui/material";
import { CGoodForm } from "./GoodForm";
import { connect } from "react-redux";

export const AdminGoodPage = ({ good }) => (
    <Box className="AdminGoodPage">
        <CGoodForm good={good} />
    </Box>
);
export const CAdminGoodPage = connect((state) => ({ good: state.promise?.adminGoodById?.payload || {} }))(AdminGoodPage);
