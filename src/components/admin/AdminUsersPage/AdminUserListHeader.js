import { AddButton } from "../../common/AddButton";
import { TableCell, TableRow, TableSortLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminUserListHeader = ({ onSortChange, sort }) => {
    const navigate = useNavigate();
    return (
        <TableRow className="AdminUserListHeader">
            <TableCell scope="col">
                <TableSortLabel
                    active={sort === "_id" || sort === "-_id"}
                    direction={sort === "_id" ? "asc" : "desc"}
                    onClick={() => onSortChange(sort === "_id" ? "-_id" : "_id")}
                >
                    #
                </TableSortLabel>
            </TableCell>
            <TableCell scope="col">Аватар</TableCell>
            <TableCell scope="col">
                <TableSortLabel
                    active={sort === "username" || sort === "-username"}
                    direction={sort === "username" ? "asc" : "desc"}
                    onClick={() => onSortChange(sort === "username" ? "-username" : "username")}
                >
                    Username
                </TableSortLabel>
            </TableCell>
            <TableCell scope="col">
                <TableSortLabel
                    active={sort === "is_active" || sort === "-is_active"}
                    direction={sort === "is_active" ? "asc" : "desc"}
                    onClick={() => onSortChange(sort === "is_active" ? "-is_active" : "is_active")}
                >
                    Активний
                </TableSortLabel>
            </TableCell>
            <TableCell scope="col">
                <TableSortLabel
                    active={sort === "is_superuser" || sort === "-is_superuser"}
                    direction={sort === "is_superuser" ? "asc" : "desc"}
                    onClick={() => onSortChange(sort === "is_superuser" ? "-is_superuser" : "is_superuser")}
                >
                    Адміністратор
                </TableSortLabel>
            </TableCell>
            <TableCell scope="col">
                <AddButton
                    onClick={() => {
                        navigate("/admin/order/");
                    }}
                />
            </TableCell>
        </TableRow>
    );
};

export { AdminUserListHeader };
