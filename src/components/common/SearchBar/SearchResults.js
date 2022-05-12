import { connect } from 'react-redux';
import { useEffect } from 'react';
import SearchGoodResultItem from './SearchGoodResultItem';
import { HiOutlineEmojiSad } from 'react-icons/hi';
import SearchCategoryResultItem from './SearchCategoryResultItem';
import { Divider, Paper, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Error } from '../Error';

export const SearchResults = ({ items, onItemClick, itemLink = '' }) => {
    useEffect(() => {
        console.log(items);
    }, [items]);
    return (
        <Paper className="SearchResults">
            <Stack>
                {!!items?.length ? (
                    itemLink.match(/.+(good).+/) ? (
                        items.map((good) => (
                            <Box>
                                <SearchGoodResultItem
                                    link={itemLink}
                                    good={good}
                                    key={good._id}
                                    onClick={() => onItemClick && onItemClick()}
                                />
                                <Divider sx={{ my: 1 }} />
                            </Box>
                        ))
                    ) : itemLink.match(/.+(category || categories).+/) ? (
                        items.map((cat) => (
                            <Box>
                                <SearchCategoryResultItem
                                    link={itemLink}
                                    category={cat}
                                    key={cat._id}
                                    onClick={() => onItemClick && onItemClick()}
                                />
                                <Divider sx={{ my: 1 }} />
                            </Box>
                        ))
                    ) : (
                        []
                    )
                ) : (
                    <Error>Ничего не знайдено</Error>
                )}
            </Stack>
        </Paper>
    );
};

const CSearchResults = connect((state) => ({ items: state.promise.goodsFind?.payload || [] }))(SearchResults);

export default CSearchResults;
