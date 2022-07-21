import { useDropzone } from "react-dropzone";
import { useEffect } from "react";
import { Box } from "@mui/material";
export const DropZone = ({ onFileDrop, children }) => {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

    useEffect(() => {
        if (acceptedFiles.length) {
            onFileDrop(acceptedFiles);
        }
    }, [acceptedFiles]);

    return (
        <Box {...getRootProps({ className: "Dropzone" })}>
            <input {...getInputProps()} />
            {children}
        </Box>
    );
};
