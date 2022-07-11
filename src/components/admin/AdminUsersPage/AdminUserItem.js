import { Link } from "react-router-dom";

import { Box, Button, TableCell, TableRow } from "@mui/material";
import { AiFillPlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { backendURL, mediaURL } from "../../../helpers";
import defaultAvatarImage from "../../../images/default-avatar-image.png";

const AdminUserItem = ({ user }) => (
    <TableRow className="AdminUserItem">
        <TableCell scope="row">{user._id}</TableCell>
        <TableCell scope="row">
            {
                <Box
                    component="img"
                    src={user?.avatar ? `${backendURL}${mediaURL}${user.avatar?.url}` : defaultAvatarImage}
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = defaultAvatarImage;
                    }}
                />
            }
        </TableCell>
        <TableCell>{user.username ? user.username : "-"}</TableCell>
        <TableCell>
            {typeof user.is_active === "boolean" ? user.is_active ? <AiFillPlusCircle /> : <AiOutlineMinusCircle /> : "-"}
        </TableCell>
        <TableCell>{user.acl ? user.acl.includes("admin") ? <AiFillPlusCircle /> : <AiOutlineMinusCircle /> : "-"}</TableCell>
        <TableCell className="edit">
            <Button component={Link} className="Link" to={`/admin/user/${user._id}/`} variant="contained">
                Редагувати
            </Button>
        </TableCell>
    </TableRow>
);

export { AdminUserItem };
