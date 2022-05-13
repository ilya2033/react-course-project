import { actionPopupOpen } from '../../../reducers';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import defaultGoodImage from '../../../images/default-good-image.png';
import { FaEdit } from 'react-icons/fa';
import { Box, Button, TableCell, TableRow } from '@mui/material';

const AdminGoodItem = ({ good }) => (
    <TableRow className="AdminGoodItem">
        <TableCell scope="row">{good._id}</TableCell>
        <TableCell>{good.name ? good.name : '-'}</TableCell>
        <TableCell>
            {
                <Box
                    component="img"
                    src={good.images?.length ? `${good.images ? good.images[0]?.url : ''}` : defaultGoodImage}
                />
            }
        </TableCell>
        <TableCell>{good.price ? good.price : '-'}</TableCell>
        <TableCell>{good.amount ? good.amount : '-'}</TableCell>
        <TableCell>
            {good.categories
                ? (good.categories || []).map((category) => <div key={category._id}>{category?.name}</div>)
                : '-'}
        </TableCell>
        <TableCell className="edit">
            <Button component={Link} className="Link" to={`/admin/good/${good._id}/`}>
                Редагувати
            </Button>
        </TableCell>
    </TableRow>
);

export { AdminGoodItem };
