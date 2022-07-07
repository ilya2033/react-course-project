import { AdminOrderListHeader } from "./AdminOrderListHeader";
import { connect } from "react-redux";

import { SearchBar, SearchResults } from "../../common/SearchBar";
import { actionOrdersFind } from "../../../actions/actionOrdersFind";
import { actionPromiseClear } from "../../../reducers";
import { Box, Table, TableBody, TableHead } from "@mui/material";
import { AdminOrderItem } from "./AdminOrderItem";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

const CSearchBar = connect(null, {
    onSearch: (text) => actionOrdersFind({ promiseName: "adminOrdersFind", text, limit: 5 }),
    onSearchEnd: () => actionPromiseClear("adminOrdersFind"),
})(SearchBar);

const CSearchResults = connect((state) => ({ items: state.promise.adminOrdersFind?.payload || [] }))(SearchResults);

const AdminOrderList = ({ orders, orderBy = "_id" }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    return (
        <Box className="AdminOrderList">
            <Box className="searchBarWrapper">
                <CSearchBar
                    render={CSearchResults}
                    searchLink="/admin/orders/search"
                    renderParams={{ itemLink: "/admin/order/" }}
                    onSearchButtonClick={(text) => {
                        searchParams.set("text", text);
                        setSearchParams(searchParams);
                        navigate({ pathname: "/admin/orders/search", search: createSearchParams(searchParams).toString() });
                    }}
                />
            </Box>
            <Table>
                <TableHead>
                    <AdminOrderListHeader
                        sort={orderBy}
                        onSortChange={(orderBy) => {
                            searchParams.set("orderBy", orderBy);
                            setSearchParams(searchParams);
                        }}
                    />
                </TableHead>
                <TableBody>
                    {(orders || []).map((order) => (
                        <AdminOrderItem order={order} key={order._id} />
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
};

const CAdminOrderList = connect((state) => ({ orders: state.feed?.payload || [] }))(AdminOrderList);

export { AdminOrderList, CAdminOrderList };
