import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { actionCartAdd, actionCartDelete } from "../../../reducers";
import { AuthModal } from "../AuthModal";

export const BuyButton = ({ onClick, onDeleteClick, good, cart }) => {
    const [inCart, setInCart] = useState(false);
    const token = useSelector((state) => state.auth.token || null);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    useEffect(() => {
        setInCart(!!(cart[good._id] && cart[good._id].count) || false);
    }, [good, cart]);

    return (
        <Box className="BuyButton ">
            {inCart ? (
                <Button onClick={() => onDeleteClick(good)} variant="outlined">
                    Вже у кошику
                </Button>
            ) : good.amount > 0 ? (
                <Button onClick={() => (token ? onClick(good) : setIsAuthModalOpen(true))} variant="contained" className="button">
                    Купити
                </Button>
            ) : (
                <Button disabled variant="contained" className="button">
                    Немає в наявності
                </Button>
            )}
            <AuthModal open={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </Box>
    );
};

const CBuyButton = connect((state) => ({ cart: state.cart || {} }), {
    onClick: (good) => actionCartAdd(good),
    onDeleteClick: (good) => actionCartDelete(good),
})(BuyButton);

export { CBuyButton };
