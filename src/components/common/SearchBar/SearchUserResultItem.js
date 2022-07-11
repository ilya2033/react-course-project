import { Link } from "react-router-dom";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { backendURL, mediaURL } from "../../../helpers";
import defaultAvatarImage from "../../../images/default-avatar-image.png";
import { AiFillPlusCircle, AiOutlineMinusCircle } from "react-icons/ai";

export const SearchUserResultItem = ({ user, onClick, link = "" } = {}) => {
    const { _id, username, avatar, is_active, acl } = user || {};

    return (
        <Grid
            container
            component={Link}
            to={`${link}${_id}/`}
            className="SearchUserResultItem Link"
            onClick={() => onClick && onClick()}
            spacing={1}
        >
            <Grid item xs={3}>
                <Box
                    component="img"
                    src={avatar ? `${backendURL}${mediaURL}${avatar?.url}` : defaultAvatarImage}
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = defaultAvatarImage;
                    }}
                />
            </Grid>
            <Grid item xs={3}>
                <Box sx={{ p: 1 }}>
                    <Typography variant="body1" sx={{ flexGrow: 1 }}>
                        {username.length > 30 ? `${username.substring(0, 30)}...` : username}
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={3} sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                <Typography variant="body1">
                    {typeof is_active === "boolean" ? is_active ? <AiFillPlusCircle /> : <AiOutlineMinusCircle /> : "-"}
                </Typography>
            </Grid>
            <Grid item xs={3} sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                <Typography variant="body1">
                    {acl ? acl.includes("admin") ? <AiFillPlusCircle /> : <AiOutlineMinusCircle /> : "-"}
                </Typography>
            </Grid>
        </Grid>
    );
};
