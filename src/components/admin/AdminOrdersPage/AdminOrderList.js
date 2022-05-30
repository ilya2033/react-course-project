import { AdminOrderListHeader } from './AdminOrderListHeader';
import { connect } from 'react-redux';

import { SearchBar, SearchResults } from '../../common/SearchBar';
import { actionOrdersFind } from '../../../actions/actionOrdersFind';
import { actionPromiseClear } from '../../../reducers';
import { Box, Table, TableBody, TableHead } from '@mui/material';
import { AdminOrderItem } from './AdminOrderItem';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';

const CSearchBar = connect(null, {
    onSearch: (text) => actionOrdersFind({ promiseName: 'adminOrdersFind', text, limit: 5 }),
    onSearchButtonClick: () => actionPromiseClear('adminOrdersFind'),
})(SearchBar);

const CSearchResults = connect((state) => ({ items: state.promise.adminOrdersFind?.payload || [] }))(SearchResults);

const AdminOrderList = ({ orders, orderBy = '_id' }) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Box className="AdminOrderList">
            <Box className="searchBarWrapper">
                <CSearchBar
                    render={CSearchResults}
                    searchLink="/admin/orders/search/"
                    renderParams={{ itemLink: '/admin/order/' }}
                />
            </Box>
            <Table>
                <TableHead>
                    <AdminOrderListHeader
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
