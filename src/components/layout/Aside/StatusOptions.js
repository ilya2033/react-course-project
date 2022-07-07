import { Box, Divider, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useSearchParams } from "react-router-dom";

export const StatusOptions = ({ options }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <Box className="StatusOptions">
            <List>
                {[{ value: 0, label: "Всі" }, ...(options || [])].map((option) => (
                    <Box key={option.value}>
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={() => {
                                    searchParams.set("status", option.value);
                                    setSearchParams(searchParams);
                                }}
                            >
                                <ListItemText primary={option.label || ""} />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                    </Box>
                ))}
            </List>
        </Box>
    );
};
