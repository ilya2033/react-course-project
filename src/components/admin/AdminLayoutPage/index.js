import { Box, Container } from '@mui/material';
import { Routes } from 'react-router-dom';
import { CProtectedRoute } from '../../common/ProtectedRoute';

const AdminLayoutPage = () => {
    return (
        <Box className="AdminLayoutPage">
            <Routes></Routes>
        </Box>
    );
};

export { AdminLayoutPage };
