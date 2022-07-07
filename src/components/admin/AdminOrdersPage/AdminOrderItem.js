import { Link } from "react-router-dom";

import { Button, TableCell, TableRow, Typography } from "@mui/material";
import { statusNumber } from "../../../helpers";

const AdminOrderItem = ({ order }) => (
    <TableRow className="AdminOrderItem">
        <TableCell scope="row">{order._id}</TableCell>
        <TableCell>{order?.owner?.username ? order.owner.username : "-"}</TableCell>
        <TableCell>
            {order.orderGoods
                ? (order.orderGoods || []).map((orderGood) => (
                      <Typography variant="body2">
                          {orderGood.good.name} - {orderGood.count}
                      </Typography>
                  ))
                : "-"}
        </TableCell>
        <TableCell>{order.price ? order.price : "-"}</TableCell>
        <TableCell>{"" + order?.status?.length ? statusNumber[+order.status] : "-"}</TableCell>
        <TableCell className="edit">
            <Button component={Link} className="Link" to={`/admin/order/${order._id}/`} variant="contained">
                Редагувати
            </Button>
        </TableCell>
    </TableRow>
);

export { AdminOrderItem };
