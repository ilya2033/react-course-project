import { connect } from 'react-redux';
import { AddButton } from '../../common/AddButton';

import { TableCell, TableRow, TableSortLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminCategoryListHeader = ({ sort, onSortChange }) => {
    const navigate = useNavigate();
    console.log(sort);
    return (
        <TableRow className="AdminCategoryListHeader">
            <TableCell scope="col">
                <TableSortLabel
                    active={sort === '_id' || sort === '-_id'}
                    direction={sort === '_id' ? 'asc' : 'desc'}
                    onClick={() => onSortChange(sort === '_id' ? '-_id' : '_id')}
                >
                    NAME
                </TableSortLabel>
                #
            </TableCell>
            <TableCell scope="col">Название</TableCell>
            <TableCell scope="col">Родительская категория</TableCell>
            <TableCell scope="col">
                <AddButton
                    onClick={() => {
                        navigate(`/admin/category/`);
                    }}
                />
            </TableCell>
        </TableRow>
    );
};

export { AdminCategoryListHeader };
