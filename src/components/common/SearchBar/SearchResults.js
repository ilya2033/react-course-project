import { connect } from "react-redux";
import SearchGoodResultItem from "./SearchGoodResultItem";
import SearchCategoryResultItem from "./SearchCategoryResultItem";
import { Divider, Paper, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { Error } from "../Error";
import SearchOrderResultItem from "./SearchOrderResultItem";

export const SearchResults = ({ items, onItemClick, itemLink = "" }) => {
    return (
        <Paper className="SearchResults">
            <Stack>
                {!!items?.length ? (
                    itemLink.match(/.+(good).+/) ? (
                        items.map((good) => (
                            <Box key={good._id}>
                                <SearchGoodResultItem
                                    link={itemLink}
                                    good={good}
                                    key={good._id}
                                    onClick={() => onItemClick && onItemClick()}
                                />
                                <Divider sx={{ my: 1 }} />
                            </Box>
                        ))
                    ) : itemLink.match(/.+(category|categories).+/) ? (
                        items.map((cat) => (
                            <Box key={cat._id}>
                                <SearchCategoryResultItem
                                    link={itemLink}
                                    category={cat}
                                    key={cat._id}
                                    onClick={() => onItemClick && onItemClick()}
                                />
                                <Divider sx={{ my: 1 }} />
                            </Box>
                        ))
                    ) : itemLink.match(/.+(order|orders).+/) ? (
                        items.map((order) => (
                            <Box key={order._id}>
                                <SearchOrderResultItem
                                    link={itemLink}
                                    order={order}
                                    key={order._id}
                                    onClick={() => onItemClick && onItemClick()}
                                />
                                <Divider sx={{ my: 1 }} />
                            </Box>
                        ))
                    ) : (
                        []
                    )
                ) : (
                    <Error>Нічого не знайдено</Error>
                )}
            </Stack>
        </Paper>
    );
};

const CSearchResults = connect((state) => ({ items: state.promise.goodsFind?.payload || [] }))(SearchResults);

export { CSearchResults };
