import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { actionCartAdd, actionCartDelete } from '../../../reducers';

export const BuyButton = ({ onClick, onDeleteClick, good, cart }) => {
    const [inCart, setInCart] = useState(false);

    useEffect(() => {
        setInCart(!!(cart[good._id] && cart[good._id].count) || false);
    }, [good, cart]);
    return (
        <Box className="BuyButton ">
            {inCart ? (
                <Button onClick={() => onDeleteClick(good)} variant="outlined">
                    Вже у кошику
                </Button>
            ) : (
                <Button onClick={() => onClick(good)} variant="contained" className="button">
                    Купити
                </Button>
            )}
        </Box>
    );
};

const CBuyButton = connect((state) => ({ cart: state.cart || {} }), {
    onClick: (good) => actionCartAdd(good),
    onDeleteClick: (good) => actionCartDelete(good),
})(BuyButton);

export { CBuyButton };
