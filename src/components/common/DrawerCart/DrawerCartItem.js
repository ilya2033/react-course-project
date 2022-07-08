import { Box } from "@mui/system";
import defaultGoodImage from "../../../images/default-good-image.png";
import { IoCloseOutline } from "react-icons/io5";

import { Typography, IconButton, Card, CardMedia, CardContent } from "@mui/material";
import { backendURL, mediaURL } from "../../../helpers";

const DrawerCartItem = ({ order, onDeleteClick }) => {
    const {
        good: { _id, images = [], name = "", price = 0 },
    } = order || {};

    return (
        <Card className="DrawerCartItem">
            <CardMedia
                component="img"
                sx={{ width: 90 }}
                src={images && images[0]?.url ? `${backendURL}${mediaURL}${images ? images[0]?.url : ""}` : defaultGoodImage}
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = defaultGoodImage;
                }}
            />
            <Box sx={{ display: "flex", width: "100%" }}>
                <CardContent className="content">
                    <Typography component="div" variant="h5">
                        {name.length > 20 ? `${name.slice(0, 15)}...` : name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {price} ₴
                    </Typography>
                </CardContent>
                <Box className="buttons">
                    <IconButton onClick={() => onDeleteClick({ _id, images, name, price })}>
                        <IoCloseOutline />
                    </IconButton>
                </Box>
            </Box>
        </Card>
    );
};

export { DrawerCartItem };
