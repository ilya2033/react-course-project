import { Box, Grid } from "@mui/material";
import { GoodCard } from "../GoodCard";

export const GoodList = ({ goods = [] } = {}) => {
    return (
        <Box className="GoodList">
            <Grid container spacing={2}>
                {(goods || []).map((good) => (
                    <Grid item xs={3} key={good._id}>
                        <GoodCard good={good} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
