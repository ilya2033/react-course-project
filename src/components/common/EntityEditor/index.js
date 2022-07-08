import { useEffect, useState } from "react";
import { arrayMoveImmutable } from "array-move";
import { DropZone } from "../DropZone";
import { SortableList } from "./SortableList";
import { SortableItem } from "./SortableItem";
import { Box, Button, IconButton, ImageList, ImageListItem, ImageListItemBar, Typography } from "@mui/material";
import { MdClose } from "react-icons/md";
import { backendURL, mediaURL } from "../../../helpers";

export const EntityEditor = ({ entity = { images: [] }, onSave, onFileDrop, uploadFiles, onImagesSave }) => {
    const [state, setState] = useState(entity);

    useEffect(() => {
        setState(entity);
    }, [entity]);

    useEffect(() => {
        if (uploadFiles?.status === "FULFILLED") {
            setState({ ...state, images: [...(state.images || []), ...uploadFiles?.payload] });
        }
    }, [uploadFiles]);

    useEffect(() => {
        onImagesSave && onImagesSave(state.images?.filter((img) => img?._id && img?.url));
    }, [state]);

    const onSortEnd = ({ oldIndex, newIndex }) => {
        setState({ ...state, images: arrayMoveImmutable(state.images, oldIndex, newIndex) });
    };
    const onItemRemove = (toRemoveId) => {
        setState({ ...state, images: [...state.images.filter((el) => el?._id !== toRemoveId)] });
    };

    return (
        <Box className="EntityEditor">
            <DropZone onFileDrop={(files) => onFileDrop(files)}>
                <Typography>Drop images here!</Typography>
            </DropZone>
            {!!state?.images?.length && (
                <SortableList pressDelay={200} onSortEnd={onSortEnd} axis="xy" className="SortableContainer">
                    <ImageList sx={{ maxHeight: 800 }} cols={3} fullwidth="true">
                        {state.images?.map(
                            (image, index) =>
                                !!image?._id &&
                                !!image?.url && (
                                    <SortableItem key={`item-${image._id}`} index={index}>
                                        <ImageListItem key={image._id}>
                                            <ImageListItemBar
                                                sx={{
                                                    background: "rgba(0,0,0,0.1)",
                                                }}
                                                actionIcon={
                                                    <IconButton onClick={() => onItemRemove(image._id)}>
                                                        <MdClose />
                                                    </IconButton>
                                                }
                                            />
                                            <Box
                                                component="img"
                                                className="DropZoneImage"
                                                src={`${backendURL}${mediaURL}${image.url}`}
                                                loading="lazy"
                                            />
                                        </ImageListItem>
                                    </SortableItem>
                                )
                        )}
                    </ImageList>
                </SortableList>
            )}
            {!!onSave && (
                <Button
                    onClick={() => {
                        onSave(entity._id, state.images);
                    }}
                >
                    Save
                </Button>
            )}
        </Box>
    );
};
