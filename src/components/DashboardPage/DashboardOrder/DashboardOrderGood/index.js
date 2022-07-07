import { Box, Grid, Typography } from "@mui/material";
import defaultGoodImage from "../../../../images/default-good-image.png";

export const DashboardOrderGood = ({ orderGood }) => {
    const { good, count, price } = orderGood || [];
    return (
        <Box className="DashboardOrderGood">
            <Grid container spacing={4}>
                <Grid item xs={2}>
                    <Box component="img" src={good?.images[0]?.url ? `/${good?.images[0]?.url}` : defaultGoodImage} />
                </Grid>
                <Grid item xs={10}>
                    <Typography textAlign="left">Назва: {good?.name || "-"}</Typography>
                    <Typography textAlign="left">Ціна: {`${good?.price} x ${count} = ${price}` || "-"}</Typography>
                </Grid>
            </Grid>
        </Box>
    );
};
