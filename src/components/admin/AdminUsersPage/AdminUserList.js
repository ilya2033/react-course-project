import { AdminUserListHeader } from "./AdminUserListHeader";
import { connect } from "react-redux";

import { SearchBar, SearchResults } from "../../common/SearchBar";
import { actionUsersFind } from "../../../actions/actionUsersFind";
import { actionPromiseClear } from "../../../reducers";
import { Box, Table, TableBody, TableHead } from "@mui/material";
import { AdminUserItem } from "./AdminUserItem";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

const CSearchBar = connect(null, {
    onSearch: (text) => actionUsersFind({ promiseName: "adminUsersFind", text, limit: 5 }),
    onSearchEnd: () => actionPromiseClear("adminUsersFind"),
})(SearchBar);

const CSearchResults = connect((state) => ({ items: state.promise.adminUsersFind?.payload || [] }))(SearchResults);

const AdminUserList = ({ users, orderBy = "_id" }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    return (
        <Box className="AdminUserList">
            <Box className="searchBarWrapper">
                <CSearchBar
                    render={CSearchResults}
                    searchLink="/admin/users/search"
                    renderParams={{ itemLink: "/admin/user/" }}
                    onSearchButtonClick={(text) => {
                        searchParams.set("text", text);
                        setSearchParams(searchParams);
                        navigate({ pathname: "/admin/users/search", search: createSearchParams(searchParams).toString() });
                    }}
                />
            </Box>
            <Table>
                <TableHead>
                    <AdminUserListHeader
                        sort={orderBy}
                        onSortChange={(orderBy) => {
                            searchParams.set("orderBy", orderBy);
                            setSearchParams(searchParams);
                        }}
                    />
                </TableHead>
                <TableBody>
                    {(users || []).map((user) => (
                        <AdminUserItem user={user} key={user._id} />
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
};

const CAdminUserList = connect((state) => ({ users: state.feed?.payload || [] }))(AdminUserList);

export { AdminUserList, CAdminUserList };
