import { Box, Typography } from '@mui/material';
import { CAdminCategoryList } from './AdminCategoryList';

export const AdminCategoriesPage = () => {
    return (
        <Box className="AdminCategoriesPage">
            <Typography variant="h5" sx={{ marginBottom: '10px', marginTop: '10px' }}>
                Категорії
            </Typography>
            <CAdminCategoryList />
        </Box>
    );
};
