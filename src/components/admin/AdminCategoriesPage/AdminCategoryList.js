import { AdminCategoryItem } from "./AdminCategoryItem";
import { AdminCategoryListHeader } from "./AdminCategoryListHeader";
import { connect } from "react-redux";
import { actionCatsFind } from "../../../actions/actionCatsFind";
import { actionPromiseClear } from "../../../reducers";
import { SearchBar, SearchResults } from "../../common/SearchBar";
import { Box, LinearProgress, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

const CSearchBar = connect(null, {
    onSearch: (text) => actionCatsFind({ promiseName: "adminCatsFind", text, limit: 5 }),
    onSearchEnd: () => actionPromiseClear("adminCatsFind"),
})(SearchBar);

const CSearchResults = connect((state) => ({ items: state.promise.adminCatsFind?.payload || [] }))(SearchResults);

const AdminCategoryList = ({ categories, orderBy = "_id", promiseStatus = null } = {}) => {
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <Box className="AdminCategoryList">
            <Box className="searchBarWrapper">
                <CSearchBar
                    render={CSearchResults}
                    searchLink="/admin/categories/search"
                    renderParams={{ itemLink: "/admin/category/" }}
                    onSearchButtonClick={(text) => {
                        searchParams.set("text", text);
                        setSearchParams(searchParams);
                        navigate({ pathname: "/admin/categories/search", search: createSearchParams(searchParams).toString() });
                    }}
                />
            </Box>
            <Table>
                <TableHead>
                    <AdminCategoryListHeader
                        sort={orderBy}
                        onSortChange={(orderBy) => {
                            searchParams.set("orderBy", orderBy);
                            setSearchParams(searchParams);
                        }}
                    />
                </TableHead>
                <TableBody>
                    {(categories || []).map((cat) => (
                        <AdminCategoryItem category={cat} key={cat._id} />
                    ))}
                    {promiseStatus === "PENDING" && (
                        <TableRow>
                            <TableCell colSpan="4">
                                <LinearProgress />
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Box>
    );
};

const CAdminCategoryList = connect((state) => ({
    promiseStatus: state?.promise?.feedCatAll?.status || state?.promise?.feedCatsFind?.status || null,
    categories: state.feed?.payload || [],
}))(AdminCategoryList);

export { AdminCategoryList, CAdminCategoryList };
