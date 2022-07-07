import { Box, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { MdLogout } from "react-icons/md";
import { actionLogout } from "../../../../actions/actionLogout";

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
