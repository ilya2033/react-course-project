import { Link } from 'react-router-dom';
import { Box, Grid, Stack, Typography } from '@mui/material';
const SearchOrderResultItem = ({ order, onClick, link = '' } = {}) => {
    const { _id = null, email = '', phoneNumber = '' } = order || {};

    return (
        <Grid
            container
            component={Link}
            to={`${link}${_id}/`}
            className="SearchOrderResultItem Link"
            onClick={() => onClick && onClick()}
            spacing={1}
        >
            <Grid item xs={2}>
                <Box sx={{ p: 1 }}>
                    <Typography variant="body1">{_id}</Typography>
                </Box>
            </Grid>
            <Grid item xs={5}>
                <Box sx={{ p: 1 }}>
                    <Typography>{email.length > 30 ? `${email.substring(0, 30)}...` : email}</Typography>
                </Box>
            </Grid>

            <Grid item xs={5}>
                <Box sx={{ p: 1 }}>
                    <Typography>{phoneNumber}</Typography>
                </Box>
            </Grid>
        </Grid>
    );
};

export default SearchOrderResultItem;
