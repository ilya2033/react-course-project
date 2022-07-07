import { AdminGoodListHeader } from "./AdminGoodListHeader";
import { AdminGoodItem } from "./AdminGoodItem";
import { connect } from "react-redux";
import { useEffect, useState } from "react";

import { SearchBar, SearchResults } from "../../common/SearchBar";
import { actionGoodsFind } from "../../../actions/actionGoodsFind";
import { actionPromiseClear } from "../../../reducers";
import { Box, Table, TableBody, TableHead } from "@mui/material";
import { createSearchParams, useLocation, useNavigate, useSearchParams } from "react-router-dom";

const CSearchBar = connect(null, {
    onSearch: (text) => actionGoodsFind({ promiseName: "adminGoodsFind", text, limit: 5 }),
    onSearchEnd: () => actionPromiseClear("adminGoodsFind"),
})(SearchBar);

const CSearchResults = connect((state) => ({ items: state.promise.adminGoodsFind?.payload || [] }))(SearchResults);

const AdminGoodList = ({ goods, orderBy = "_id" }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <Box className="AdminGoodList">
            <Box className="searchBarWrapper">
                <CSearchBar
                    render={CSearchResults}
                    searchLink="/admin/goods/search"
                    renderParams={{ itemLink: "/admin/good/" }}
                    onSearchButtonClick={(text) => {
                        searchParams.set("text", text);
                        setSearchParams(searchParams);
                        navigate({ pathname: "/admin/goods/search", search: createSearchParams(searchParams).toString() });
                    }}
                />
            </Box>
            <Table>
                <TableHead>
                    <AdminGoodListHeader
                        sort={orderBy}
                        onSortChange={(orderBy) => {
                            navigate({
                                pathname: location.pathname,
                                search: createSearchParams({
                                    orderBy,
                                }).toString(),
                            });
                        }}
                    />
                </TableHead>
                <TableBody>
                    {(goods || []).map((good) => (
                        <AdminGoodItem good={good} key={good._id} />
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
};

const CAdminGoodList = connect((state) => ({ goods: state.feed?.payload || [] }))(AdminGoodList);

export { AdminGoodList, CAdminGoodList };
