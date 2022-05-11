import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GoodCard } from '../common/GoodCard';

const GoodsPage = ({ category = {} }) => {
    const { goods = [], name = '' } = category || {};

    return (
        <Box className="MainPage">
            <Grid container spacing={2}>
                {(goods || []).map((good) => (
                    <Grid item xs={3}>
                        <GoodCard good={good} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

const CGoodsPage = connect((state) => ({ category: state?.promise?.catById?.payload || [] }))(GoodsPage);
export { GoodsPage, CGoodsPage };
