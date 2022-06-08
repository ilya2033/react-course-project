import { Badge, Box, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { MdOutlineShoppingCart } from 'react-icons/md';

export const CartIcon = ({ cart }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        let count = 0;
        for (let order of Object.values(cart)) {
            count += +order.count;
        }
        setCount(count);
    }, [cart]);
    return (
        <Box className="CartIcon">
            <Badge badgeContent={count} color="primary">
                <MdOutlineShoppingCart className="CartLogo" />
            </Badge>
        </Box>
    );
};

export const CCartIcon = connect((state) => ({ cart: state.cart || {} }))(CartIcon);
