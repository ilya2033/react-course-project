import { Box, Grid } from '@mui/material';
import { useEffect } from 'react';
import { GoodCard } from '../GoodCard';

export const GoodList = ({ goods = [] } = {}) => {
    useEffect(() => {
        console.log(goods);
    }, [goods]);
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
