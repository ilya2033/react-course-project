import { Link } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
export const SearchCategoryResultItem = ({ category, onClick, link = "" } = {}) => {
    const { _id = null, name = "" } = category || {};

    return (
        <Link className="Link" to={`${link}${_id}/`}>
            <Stack direction="row" className="SearchCategoryResultItem" onClick={() => onClick && onClick()}>
                <Typography sx={{ flexGrow: 1 }}>{name.length > 30 ? `${name.substring(0, 30)}...` : name}</Typography>

                <Typography>{_id}</Typography>
            </Stack>
        </Link>
    );
};
