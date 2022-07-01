import { Grid, Stack, Typography, Divider } from '@mui/material';
import { Box } from '@mui/system';
import { connect, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GoodCard } from '../common/GoodCard';
import { GoodList } from '../common/GoodList';
import { SubCategories } from './SubCategories';
import { SortOptions } from '../common/SortOptions';
import { actionCatById } from '../../actions/actionCatById';
import { useEffect } from 'react';

const GoodsPage = ({ category = {} }) => {
    const { goods = [], name = '', subcategories = [] } = category || {};
    useEffect(() => {
        console.log(category);
    }, [category]);
    const dispatch = useDispatch();
    return (
        <Box className="GoodsPage">
            <Box>
                <Typography variant="h5" textAlign="center">
                    {name}
                </Typography>
            </Box>

            <Divider className="Divider" />
            <Stack>
                <Box className="sortOptionsWrapper">
                    <SortOptions
                        onClick={(option) =>
                            category._id && dispatch(actionCatById({ _id: category._id, orderBy: option.value }))
                        }
                    />
                </Box>
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
