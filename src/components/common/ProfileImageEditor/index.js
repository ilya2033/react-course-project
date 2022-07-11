import { Box } from "@mui/material";
import { useState } from "react";
import { DropZone } from "../DropZone";
import { ProfileImage } from "./ProfileImage";

export const ProfileImageEditor = ({ onFileDrop, avatar }) => {
    const [isLetterShown, setIsLetterShown] = useState(false);
    return (
        <Box className="ProfileImageEditor">
            <DropZone onFileDrop={onFileDrop}>
                <Box
                    className="profileImageWrapper"
                    onMouseEnter={() => setIsLetterShown(true)}
                    onMouseLeave={() => setIsLetterShown(false)}
                >
                    <ProfileImage avatar={avatar} />
                    <Box className={`letter ${isLetterShown && "show"}`}>Drop file or click to update</Box>
                </Box>
            </DropZone>
        </Box>
    );
};
