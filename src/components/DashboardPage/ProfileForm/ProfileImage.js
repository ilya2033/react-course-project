import { connect } from "react-redux";

import { backendURL, mediaURL } from "../../../helpers";
import defaultAvatarImage from "../../../images/default-avatar-image.png";

export const ProfileImage = ({ avatar }) => {
    return <img src={avatar?.url ? `${backendURL}${mediaURL}${avatar?.url}` : defaultAvatarImage} className="ProfileImage" />;
};

export const CProfileImage = connect((state) => ({ avatar: state.promise?.aboutMe?.payload?.avatar || {} }))(ProfileImage);
