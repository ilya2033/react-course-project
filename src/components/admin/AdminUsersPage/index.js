import { Box, Typography } from "@mui/material";
import { CAdminUserList } from "./AdminUserList";

export const AdminUsersPage = ({ orderBy }) => {
    return (
        <Box className="AdminUsersPage">
            <Typography variant="h5" sx={{ marginBottom: "10px", marginTop: "10px" }}>
                Користувачі
            </Typography>
            <CAdminUserList orderBy={orderBy} />
        </Box>
    );
};
