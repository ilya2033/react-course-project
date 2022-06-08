import { Badge, Box, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { MdLogout, MdOutlineShoppingCart } from 'react-icons/md';
import { useSelect } from '@mui/base';
import { actionLogout } from '../../../../actions/actionLogout';

export const LogoutIcon = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth?.token || null);

    return token ? (
        <Box className="LogoutIcon">
            <IconButton onClick={() => dispatch(actionLogout())}>
                <MdLogout className="LogoutLogo" />
            </IconButton>
        </Box>
    ) : null;
};
