import { Box, Stack } from "@mui/material";
import { CGoodCard } from "../GoodCard";

export const GoodCardSet = ({ goods = [], num = 4 } = {}) => {
    return (
        <Stack className="GoodCardSet" direction="row">
            {(goods || []).map((good) => (
                <Box sx={{ width: `${Math.floor(100 / (num || 1))}%`, padding: "10px" }} key={good?._id}>
                    <CGoodCard good={good} buyButton={false} />
                </Box>
            ))}
        </Stack>
    );
};
