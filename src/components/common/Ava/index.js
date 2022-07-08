import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { backendURL, mediaURL } from "../../../helpers";
import defaultAvatarImage from "../../../images/default-avatar-image.png";

export const Ava = () => {
    const path = useSelector((state) => state.promise.aboutMe?.payload?.avatar?.url || null);
    return <Avatar src={path ? `${backendURL}${mediaURL}${path}` : defaultAvatarImage} />;
};
