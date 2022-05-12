import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GoodCard } from '../common/GoodCard';
import { GoodList } from '../common/GoodList';

const GoodsPage = ({ category = {} }) => {
    const { goods = [], name = '' } = category || {};

    return (
        <Box className="MainPage">
            <GoodList goods={goods} />
        </Box>
    );
};

const CGoodsPage = connect((state) => ({ category: state?.promise?.catById?.payload || [] }))(GoodsPage);
export { GoodsPage, CGoodsPage };
