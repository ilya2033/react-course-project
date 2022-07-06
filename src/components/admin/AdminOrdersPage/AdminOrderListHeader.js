import { connect } from "react-redux";

import { AddButton } from "../../common/AddButton";
import { TableCell, TableRow, TableSortLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminOrderListHeader = ({ onSortChange, sort }) => {
    const navigate = useNavigate();
    return (
        <TableRow className="AdminOrderListHeader">
            <TableCell scope="col">
                <TableSortLabel
                    active={sort === "_id" || sort === "-_id"}
                    direction={sort === "_id" ? "asc" : "desc"}
                    onClick={() => onSortChange(sort === "_id" ? "-_id" : "_id")}
                >
                    #
                </TableSortLabel>
            </TableCell>
            <TableCell scope="col">Користувач</TableCell>
            <TableCell scope="col">Товари</TableCell>
            <TableCell scope="col">
                <TableSortLabel
                    active={sort === "price" || sort === "-price"}
                    direction={sort === "price" ? "asc" : "desc"}
                    onClick={() => onSortChange(sort === "price" ? "-price" : "price")}
                >
                    Ціна
                </TableSortLabel>
            </TableCell>
            <TableCell scope="col">
                <TableSortLabel
                    active={sort === "status" || sort === "-status"}
                    direction={sort === "status" ? "asc" : "desc"}
                    onClick={() => onSortChange(sort === "status" ? "-status" : "status")}
                >
                    Статус
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

export { AdminOrderListHeader };
