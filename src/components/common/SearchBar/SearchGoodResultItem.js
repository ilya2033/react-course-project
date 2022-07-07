import { Link } from "react-router-dom";
import defaultGoodImage from "../../../images/default-good-image.png";

import { Grid, Box, Typography } from "@mui/material";
import { backendURL } from "../../../helpers";
const SearchGoodResultItem = ({ good, onClick, link = "" } = {}) => {
    const { _id = 0, images = [], name = "", description = "", price = "" } = good || {};

    return (
        <Grid
            container
            component={Link}
            to={`${link}${_id}/`}
            className="SearchGoodResultItem Link"
            onClick={() => onClick && onClick()}
            spacing={1}
        >
            <Grid item xs={3}>
                <Box
                    component="img"
                    src={images ? `${backendURL}/${images[0]?.url}` : defaultGoodImage}
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = defaultGoodImage;
                    }}
                />
            </Grid>
            <Grid item xs={6}>
                <Box sx={{ p: 1 }}>
                    <Typography variant="body1" sx={{ flexGrow: 1 }}>
                        {name.length > 30 ? `${name.substring(0, 30)}...` : name}
                    </Typography>
                    <Typography variant="body2">{description.length > 70 ? `${description.substring(0, 70)}...` : description}</Typography>
                </Box>
            </Grid>
            <Grid item xs={3} sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                <Typography variant="body1">{price} ₴</Typography>
            </Grid>
        </Grid>
    );
};

export default SearchGoodResultItem;
