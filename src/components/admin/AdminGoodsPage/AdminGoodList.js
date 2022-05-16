import { AdminGoodListHeader } from './AdminGoodListHeader';
import { AdminGoodItem } from './AdminGoodItem';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';

import { SearchBar, SearchResults } from '../../common/SearchBar';
import { actionGoodsFind } from '../../../actions/actionGoodsFind';
import { actionPromiseClear } from '../../../reducers';
import { Box, Table, TableBody, TableHead } from '@mui/material';

const CSearchBar = connect(null, {
    onSearch: (text) => actionGoodsFind({ promiseName: 'adminGoodsFind', text, limit: 5 }),
    onSearchButtonClick: () => actionPromiseClear('adminGoodsFind'),
})(SearchBar);

const CSearchResults = connect((state) => ({ items: state.promise.adminGoodsFind?.payload || [] }))(SearchResults);

const AdminGoodList = ({ goods }) => {
    return (
        <Box className="AdminGoodList">
            <Box className="searchBarWrapper">
                <CSearchBar
                    render={CSearchResults}
                    searchLink="/admin/goods/search/"
                    renderParams={{ itemLink: '/admin/good/' }}
                />
            </Box>
            <Table>
                <TableHead>
                    <AdminGoodListHeader />
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
