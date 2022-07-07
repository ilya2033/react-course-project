import { Drawer } from "@mui/material";
import ReactDOM from "react-dom";

export const DrawerRight = ({ children, onClose = null, open } = {}) => {
    return ReactDOM.createPortal(
        <Drawer anchor="right" className="DrawerRight" open={open} onClose={onClose}>
            {children}
        </Drawer>,
        document.body
    );
};
