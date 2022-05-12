import { useEffect, useState } from 'react';
import { CBuyButton } from '../common/BuyButton';
import { useSelector } from 'react-redux';
import defaultGoodImage from '../../images/default-good-image.png';
import { Divider, Grid, Paper, Stack, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Carousel } from 'react-responsive-carousel';

export const GoodPage = () => {
    const good = useSelector((state) => state.promise?.goodById?.payload || {});
    const { _id = '', name = '', price = '', description = '', images = [] } = good || {};
    return (
        <Box className="GoodPage">
            <Grid container spacing={4} className="images">
                <Grid item xs={12} md={4}>
                    <Carousel showIndicators={false} showStatus={false}>
                        {(good.images || [{ url: defaultGoodImage }]).map((image) => (
                            <img src={image?.url ? `${image?.url}` : defaultGoodImage} />
                        ))}
                    </Carousel>
                </Grid>
                <Grid item xs={12} md={8} className="content">
                    <Stack spacing={2}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="body1" color="#1C1B1F">
                                <b>Ціна:</b> {price}
                            </Typography>
                            <CBuyButton good={{ name, images, price, _id }} />
                        </Stack>
                        <Divider />
                        <Typography variant="h5">
                            <b>Назва: {name}</b>
                        </Typography>
                        <Typography variant="body1">
                            Опис:
                            <br />
                            {description}
                        </Typography>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
};
