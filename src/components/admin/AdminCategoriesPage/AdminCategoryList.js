import { AdminCategoryItem } from './AdminCategoryItem';
import { AdminCategoryListHeader } from './AdminCategoryListHeader';
import { connect } from 'react-redux';
import { actionCatsFind } from '../../../actions/actionCatsFind';
import { actionPromiseClear } from '../../../reducers';
import { SearchBar, SearchResults } from '../../common/SearchBar';
import { Box, Table, TableBody, TableHead } from '@mui/material';

const CSearchBar = connect(null, {
    onSearch: (text) => actionCatsFind({ promiseName: 'adminCatsFind', text, limit: 5 }),
    onSearchButtonClick: () => actionPromiseClear('adminCatsFind'),
})(SearchBar);

const CSearchResults = connect((state) => ({ items: state.promise.adminCatsFind?.payload || [] }))(SearchResults);

const AdminCategoryList = ({ categories }) => {
    return (
        <Box className="AdminCategoryList">
            <Box className="searchBarWrapper">
                <CSearchBar
                    render={CSearchResults}
                    searchLink="/admin/categories/search/"
                    renderParams={{ itemLink: '/admin/category/' }}
                />
            </Box>
            <Table>
                <TableHead>
                    <AdminCategoryListHeader />
                </TableHead>
                <TableBody>
                    {(categories || []).map((cat) => (
                        <AdminCategoryItem category={cat} key={cat._id} />
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
};

const CAdminCategoryList = connect((state) => ({ categories: state.feed?.payload || [] }))(AdminCategoryList);

export { AdminCategoryList, CAdminCategoryList };
