import { Box } from "@mui/material";
import { CUserForm } from "./UserForm";
import { connect } from "react-redux";

export const AdminUserPage = ({ good }) => (
    <Box className="AdminUserPage">
        <CUserForm good={good} />
    </Box>
);
export const CAdminUserPage = connect((state) => ({ good: state.promise?.adminUserById?.payload || {} }))(AdminUserPage);
