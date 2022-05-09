import { backendURL } from 'helpers';
import { Link } from 'react-router-dom';
import defaultGoodImage from 'images/defaultGoodImage.png';

import { Grid, Box, Stack, Typography } from '@mui/material';
const SearchGoodResultItem = ({ good, onClick, link = '' } = {}) => {
    const { _id = 0, images = [], name = '', description = '', price = '' } = good || {};

    return (
        <Link className="Link" to={`${link}${_id}/`}>
            <Stack direction="row" className="SearchGoodResultItem" onClick={() => onClick && onClick()}>
                <Box component="img" src={images[0]?.url ? `/${images ? images[0]?.url : ''}` : defaultGoodImage} />
                <Box sx={{ p: 1, flexGrow: 1 }}>
                    <Typography variant="body1" sx={{ flexGrow: 1 }}>
                        {name.length > 30 ? `${name.substring(0, 30)}...` : name}
                    </Typography>
                    <Typography variant="body2">
                        {description.length > 70 ? `${description.substring(0, 70)}...` : description}
                    </Typography>
                </Box>
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                    {price}
                </Typography>
            </Stack>
        </Link>
    );
};

export default SearchGoodResultItem;
