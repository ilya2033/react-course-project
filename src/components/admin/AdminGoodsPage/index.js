import { Box, Typography } from '@mui/material';
import { AdminGoodList, CAdminGoodList } from './AdminGoodList';

export const AdminGoodsPage = () => {
    return (
        <Box className="AdminGoodsPage">
            <Typography variant="h5" sx={{ marginBottom: '10px', marginTop: '10px' }}>
                Товари
            </Typography>
            <CAdminGoodList />
        </Box>
    );
};
