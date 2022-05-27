import { Link } from 'react-router-dom';
import { Box, Grid, Stack, Typography } from '@mui/material';
const SearchOrderResultItem = ({ order, onClick, link = '' } = {}) => {
    const { _id = null, email = '', phoneNumber = '' } = order || {};

    return (
        <Stack
            component={Link}
            to={`${link}${_id}/`}
            className="SearchOrderResultItem Link"
            onClick={() => onClick && onClick()}
            spacing={1}
        >
            <Typography variant="body1">ID:{_id}</Typography>

            <Typography>Email:{email.length > 30 ? `${email.substring(0, 30)}...` : email}</Typography>

            <Typography>Номер:{phoneNumber}</Typography>
        </Stack>
    );
};

export default SearchOrderResultItem;
