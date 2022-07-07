import { Box } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import { statusOptions } from "../../../helpers";
import { CProtectedRoute } from "../../common/ProtectedRoute";
import { AdminCategories } from "./AdminCategories";

import { CCategories } from "./CCategories";
import { StatusOptions } from "./StatusOptions";

const Aside = ({ children }) => (
    <Box className="Aside">
        <Box className="body">
            <Routes>
                <Route
                    path="/admin/*"
                    exact
                    element={
                        <CProtectedRoute roles={["admin"]} fallback="/auth">
                            <AdminCategories />
                        </CProtectedRoute>
                    }
                />
                <Route path="/*" element={<CCategories />} />
                <Route path="*" element={<Navigate to="/404" />} />
            </Routes>

            {children}
        </Box>

        <Routes>
            <Route
                path="/admin/orders"
                exact
                element={
                    <Box className="body" mt={4}>
                        <CProtectedRoute roles={["admin"]} fallback="/auth">
                            <StatusOptions options={statusOptions} />
                        </CProtectedRoute>
                    </Box>
                }
            />
        </Routes>
    </Box>
);

export { Aside };
