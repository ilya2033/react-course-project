import { AdminGoodListHeader } from "./AdminGoodListHeader";
import { AdminGoodItem } from "./AdminGoodItem";
import { connect } from "react-redux";

import { SearchBar, SearchResults } from "../../common/SearchBar";
import { actionGoodsFind } from "../../../actions/actionGoodsFind";
import { actionPromiseClear } from "../../../reducers";
import { Box, LinearProgress, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { createSearchParams, useLocation, useNavigate, useSearchParams } from "react-router-dom";

const CSearchBar = connect(null, {
    onSearch: (text) => actionGoodsFind({ promiseName: "adminGoodsFind", text, limit: 5 }),
    onSearchEnd: () => actionPromiseClear("adminGoodsFind"),
})(SearchBar);

const CSearchResults = connect((state) => ({ items: state.promise.adminGoodsFind?.payload || [] }))(SearchResults);

const AdminGoodList = ({ goods, orderBy = "_id", promiseStatus = null } = {}) => {
    const navigate = useNavigate();
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
                            searchParams.set("orderBy", orderBy);
                            setSearchParams(searchParams);
                        }}
                    />
                </TableHead>
                <TableBody>
                    {(goods || []).map((good) => (
                        <AdminGoodItem good={good} key={good._id} />
                    ))}
                    {promiseStatus === "PENDING" && (
                        <TableRow>
                            <TableCell colSpan="7">
                                <LinearProgress />
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Box>
    );
};

const CAdminGoodList = connect((state) => ({
    goods: state.feed?.payload || [],
    promiseStatus: state?.promise?.feedGoodsAll?.status || state?.promise?.feedGoodsFind?.status || null,
}))(AdminGoodList);

export { AdminGoodList, CAdminGoodList };
