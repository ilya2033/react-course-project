import { Button } from "@mui/material";

export const AddButton = ({ isDisable = false, onClick }) => (
    <Button onClick={() => onClick()} className="AddButton" disable={isDisable.toString()} variant="contained">
        Додати
    </Button>
);
