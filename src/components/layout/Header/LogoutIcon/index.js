import { Box, IconButton } from "@mui/material";
import { MdLogout } from "react-icons/md";
import { actionLogout } from "../../../../actions/actionLogout";
import { connect } from "react-redux";

export const LogoutIcon = ({ token, onClick }) => {
    return token ? (
        <Box className="LogoutIcon">
            <IconButton onClick={onClick}>
                <MdLogout className="LogoutLogo" />
            </IconButton>
        </Box>
    ) : null;
};

export const CLogoutIcon = connect((state) => ({ token: state.auth?.token || null }), {
    onClick: () => actionLogout(),
})(LogoutIcon);
