import { Navigate, Route, Routes } from "react-router-dom";

import { Box } from "@mui/material";
import { actionPageStart } from "../../actions/actionPageStart";

import { AuthPage } from "../AuthPage";
import { LayoutPage } from "../LayoutPage";
import { CProtectedRoute } from "../common/ProtectedRoute";
import { Error404 } from "../common/Error404";
import { useEffect } from "react";
import { connect } from "react-redux";

const Root = ({ onLoad }) => {
    useEffect(() => {
        onLoad();
    }, []);

    return (
        <Box className="Root">
            <Routes>
                <Route
                    path="/auth"
                    element={
                        <CProtectedRoute roles={["anon"]} fallback="/admin">
                            <AuthPage />
                        </CProtectedRoute>
                    }
                />
                <Route path="/404" element={<Error404 />} />
                <Route path="/*" element={<LayoutPage />} />
                <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
        </Box>
    );
};

export const CRoot = connect(null, { onLoad: () => actionPageStart() })(Root);

export { Root };
