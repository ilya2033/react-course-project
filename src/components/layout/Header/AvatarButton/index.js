import { IconButton } from "@mui/material";
import { Ava } from "../../../common/Ava";

export const AvatarButton = ({ onClick }) => (
  <IconButton className="AvatarButton" onClick={onClick}>
    <Ava />
  </IconButton>
);
