import { connect } from 'react-redux';

import { AddButton } from '../../common/AddButton';
import { TableCell, TableRow, TableSortLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminOrderListHeader = ({ onSortChange, sort, sortReversed, onSortReverseChange }) => {
    const navigate = useNavigate();
    return (
        <TableRow className="AdminOrderListHeader">
            <TableCell scope="col">#</TableCell>
            <TableCell scope="col">Email</TableCell>
            <TableCell scope="col">Номер</TableCell>
            <TableCell scope="col">Товари</TableCell>
            <TableCell scope="col">Ціна</TableCell>
            <TableCell scope="col">Статус</TableCell>
            <TableCell scope="col">
                <AddButton
                    onClick={() => {
                        navigate('/admin/order/');
                    }}
                />
            </TableCell>
        </TableRow>
    );
};

export { AdminOrderListHeader };
