import { AddButton } from "../../common/AddButton";
import { TableCell, TableRow, TableSortLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminGoodListHeader = ({ onSortChange, sort }) => {
    const navigate = useNavigate();

    return (
        <TableRow className="AdminGoodListHeader">
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
            <TableCell scope="col">Зображення</TableCell>
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
                    active={sort === "amount" || sort === "-amount"}
                    direction={sort === "amount" ? "asc" : "desc"}
                    onClick={() => onSortChange(sort === "amount" ? "-amount" : "amount")}
                >
                    Кількість
                </TableSortLabel>
            </TableCell>
            <TableCell scope="col">Категорії</TableCell>
            <TableCell scope="col">
                <AddButton
                    onClick={() => {
                        navigate("/admin/good/");
                    }}
                />
            </TableCell>
        </TableRow>
    );
};

export { AdminGoodListHeader };
