import { Link } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import { statusNumber } from "../../../helpers";
const SearchOrderResultItem = ({ order, onClick, link = "" } = {}) => {
    const { _id = null, owner = null, status = "-" } = order || {};

    return (
        <Stack
            component={Link}
            to={`${link}${_id}/`}
            className="SearchOrderResultItem Link"
            onClick={() => onClick && onClick()}
            spacing={1}
        >
            <Typography variant="body1">ID: {_id}</Typography>

            <Typography>Статус: {"" + order?.status?.length ? statusNumber[+order.status] : "-"}</Typography>

            <Typography>Користувач: {owner?.username || "-"}</Typography>
        </Stack>
    );
};

export default SearchOrderResultItem;
