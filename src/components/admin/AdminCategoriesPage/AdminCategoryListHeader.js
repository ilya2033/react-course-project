import { connect } from 'react-redux';
import { AddButton } from '../../common/AddButton';

import { TableCell, TableRow, TableSortLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminCategoryListHeader = ({ sort, onSortChange, sortReversed, onSortReverseChange }) => {
    const navigate = useNavigate();
    return (
        <TableRow className="AdminCategoryListHeader">
            <TableCell scope="col">#</TableCell>
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
