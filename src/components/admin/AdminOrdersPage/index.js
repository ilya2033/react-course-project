import { Box, Typography } from '@mui/material';
import { CAdminOrderList } from './AdminOrderList';

export const AdminOrdersPage = ({ orderBy }) => {
    return (
        <Box className="AdminOrdersPage">
            <Typography variant="h5" sx={{ marginBottom: '10px', marginTop: '10px' }}>
                Замовлення
            </Typography>
            <CAdminOrderList orderBy={orderBy} />
        </Box>
    );
};
