import { AddButton } from "../../common/AddButton";

import { TableCell, TableRow, TableSortLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminCategoryListHeader = ({ sort, onSortChange }) => {
    const navigate = useNavigate();

    return (
        <TableRow className="AdminCategoryListHeader">
            <TableCell scope="col">
                <TableSortLabel
                    active={sort === "_id" || sort === "-_id"}
                    direction={sort === "_id" ? "asc" : "desc"}
                    onClick={() => onSortChange(sort === "_id" ? "-_id" : "_id")}
                >
                    #
                </TableSortLabel>
            </TableCell>
            <TableCell scope="col">
                <TableSortLabel
                    active={sort === "name" || sort === "-name"}
                    direction={sort === "name" ? "asc" : "desc"}
                    onClick={() => onSortChange(sort === "name" ? "-name" : "name")}
                >
                    Назва
                </TableSortLabel>
            </TableCell>
            <TableCell scope="col">
                <TableSortLabel
                    active={sort === "parent" || sort === "-parent"}
                    direction={sort === "parent" ? "asc" : "desc"}
                    onClick={() => onSortChange(sort === "parent" ? "-parent" : "parent")}
                >
                    Батьківська категорія
                </TableSortLabel>
            </TableCell>
            <TableCell scope="col">
                <AddButton
                    onClick={() => {
                        navigate(`/admin/category/`);
                    }}
                />
            </TableCell>
        </TableRow>
    );
};

export { AdminCategoryListHeader };
