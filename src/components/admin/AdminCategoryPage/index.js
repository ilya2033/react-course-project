import { Box } from "@mui/material";
import { connect } from "react-redux";
import { CCategoryForm } from "./CategoryForm";

export const AdminCategoryPage = ({ category }) => (
    <Box className="AdminCategoryPage">
        <CCategoryForm category={category} />
    </Box>
);
export const CAdminCategoryPage = connect((state) => ({ category: state.promise?.adminCatById?.payload || {} }))(AdminCategoryPage);
