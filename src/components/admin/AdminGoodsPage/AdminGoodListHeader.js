import { connect } from 'react-redux';

import { AddButton } from '../../common/AddButton';
import { TableCell, TableRow, TableSortLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminGoodListHeader = ({ onSortChange, sort, sortReversed, onSortReverseChange }) => {
    const navigate = useNavigate();
    return (
        <TableRow className="AdminGoodListHeader">
            <TableCell scope="col">#</TableCell>
            <TableCell scope="col">Назва</TableCell>
            <TableCell scope="col">Зображення</TableCell>
            <TableCell scope="col">Ціна</TableCell>
            <TableCell scope="col">Кількість</TableCell>
            <TableCell scope="col">Категорії</TableCell>
            <TableCell scope="col">
                <AddButton
                    onClick={() => {
                        navigate('/admin/good/');
                    }}
                />
            </TableCell>
        </TableRow>
    );
};

export { AdminGoodListHeader };
