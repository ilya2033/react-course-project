import { Box, Container } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CAuthForm } from './AuthForm';

export const AuthPage = () => {
    return (
        <Box className="AuthPage">
            <CAuthForm />
        </Box>
    );
};
