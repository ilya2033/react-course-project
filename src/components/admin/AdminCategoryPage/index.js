import { Box } from '@mui/material';
import { connect } from 'react-redux';
import { CCategoryForm } from './CategoryForm';

export const AdminCategoryPage = ({ good }) => (
    <Box className="AdminCategoryPage">
        <CCategoryForm good={good} />
    </Box>
);
export const CAdminCategoryPage = connect((state) => ({ good: state.promise?.adminCatById?.payload || {} }))(
    AdminCategoryPage
);
