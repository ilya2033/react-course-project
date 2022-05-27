import { Grid, Stack, Typography, Divider } from '@mui/material';
import { Box } from '@mui/system';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GoodCard } from '../common/GoodCard';
import { GoodList } from '../common/GoodList';
import { SubCategories } from './SubCategories';

const GoodsPage = ({ category = {} }) => {
    const { goods = [], name = '', subcategories = [] } = category || {};

    return (
        <Box className="GoodsPage">
            <Typography variant="h5" textAlign="center">
                {name}
            </Typography>
            <Divider className="Divider" />
            <Stack>
                {!!subcategories.length ? (
                    <Box>
                        <Typography variant="h6" color="#79747E" textAlign="left">
                            Категорії
                        </Typography>
                        <SubCategories categories={subcategories} />
                    </Box>
                ) : null}
                {!!goods.length ? (
                    <Box>
                        <Typography paddingBottom={1} variant="h6" color="#79747E" textAlign="left">
                            Товари
                        </Typography>
                        <GoodList goods={goods} />
                    </Box>
                ) : null}
            </Stack>
        </Box>
    );
};

const CGoodsPage = connect((state) => ({ category: state?.promise?.catById?.payload || [] }))(GoodsPage);
export { GoodsPage, CGoodsPage };
