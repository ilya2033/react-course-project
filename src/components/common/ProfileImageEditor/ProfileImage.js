import { backendURL, mediaURL } from "../../../helpers";
import defaultAvatarImage from "../../../images/default-avatar-image.png";

export const ProfileImage = ({ avatar }) => {
    return <img src={avatar?.url ? `${backendURL}${mediaURL}${avatar?.url}` : defaultAvatarImage} className="ProfileImage" />;
};
