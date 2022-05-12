import { Route, Routes } from 'react-router-dom';

import { Box } from '@mui/material';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import { actionPageStart } from '../../actions/actionPageStart';
import { useDispatch, useSelector } from 'react-redux';

import { AuthPage } from '../AuthPage';
import { LayoutPage } from '../LayoutPage';

const Root = ({ user = {} }) => {
    const isSignIn = true;
    const dispatch = useDispatch();
    dispatch(actionPageStart());

    return (
        <Box className="Root">
            <Routes>
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/*" element={<LayoutPage />} />
            </Routes>
        </Box>
    );
};

export { Root };
