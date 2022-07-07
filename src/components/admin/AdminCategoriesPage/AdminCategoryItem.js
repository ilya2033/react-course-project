import { Button, TableCell, TableRow } from "@mui/material";
import { Link } from "react-router-dom";

const AdminCategoryItem = ({ category }) => (
    <TableRow className="AdminCategoryItem">
        <TableCell scope="row">{category._id}</TableCell>
        <TableCell>{category.name ? category.name : "-"}</TableCell>
        <TableCell>{category.parent?.name ? category.parent.name : "-"}</TableCell>
        <TableCell className="edit">
            <Button component={Link} className="Link" to={`/admin/category/${category._id}/`} variant="contained">
                Редагувати
            </Button>
        </TableCell>
    </TableRow>
);

export { AdminCategoryItem };
