import { Box } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CLoginForm } from "../common/AuthModal/LoginForm";

export const AuthPage = () => {
    const navigate = useNavigate();
    const permissions = useSelector((state) => state.auth?.payload?.sub?.acl || []);

    useEffect(() => {
        if (permissions.includes("admin")) {
            navigate("/admin");
        } else if (permissions.includes("user")) {
            navigate("/");
        }
    }, [permissions]);

    return (
        <Box className="AuthPage">
            <CLoginForm inputVariant="outlined" buttonVariant="contained" />
        </Box>
    );
};
