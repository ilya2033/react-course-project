import { Box, width } from '@mui/system';
import { backendURL } from '../../../helpers';
import defaultGoodImage from '../../../images/default-good-image.png';
import { IoCloseOutline } from 'react-icons/io5';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { actionCartChange } from '../../../reducers';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
    ListItem,
    Grid,
    Typography,
    Stack,
    Container,
    IconButton,
    TextField,
    ButtonGroup,
    Button,
    Input,
    TableCell,
    TableRow,
    Card,
    CardMedia,
    CardContent,
} from '@mui/material';

const DrawerCartItem = ({ order, onDeleteClick }) => {
    const {
        good: { _id, images = [], name = '', price = 0 },
    } = order || {};

    return (
        <Card className="DrawerCartItem">
            <CardMedia
                component="img"
                sx={{ width: 90 }}
                src={images && images[0]?.url ? `${images ? images[0]?.url : ''}` : defaultGoodImage}
            />
            <Box sx={{ display: 'flex', width: '100%' }}>
                <CardContent className="content">
                    <Typography component="div" variant="h5">
                        {name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {price}
                    </Typography>
                </CardContent>
                <Box className="buttons">
                    <IconButton onClick={() => onDeleteClick({ _id, images, name, price })}>
                        <IoCloseOutline />
                    </IconButton>
                </Box>
            </Box>
        </Card>
    );
};

export { DrawerCartItem };

{
    /* <TableRow className="DrawerCartItem">
<TableCell>
    <Box
        component="img"
        src={images && images[0]?.url ? `/${images ? images[0]?.url : ''}` : defaultGoodImage}
        sx={{ width: 50 }}
    />
</TableCell>
<TableCell>
    <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h5">{name}</Typography>
        <Typography variant="body1">{price}</Typography>
    </Box>
</TableCell>
<TableCell>
    <Stack justifyContent="center" direction="row" alignItems="center">
        <IconButton onClick={() => handleChange(countInput - 1)}>
            <AiOutlineMinus />
        </IconButton>
        <Input
            value={countInput}
            onChange={(e) => handleChange(+e.target.value)}
            size="small"
            sx={{
                width: 70,
                resize: {
                    fontSize: 10,
                },
                px: 3,
            }}
        />
        <IconButton onClick={() => handleChange(countInput + 1)}>
            <AiOutlinePlus />
        </IconButton>
    </Stack>
</TableCell>
<TableCell>
    <Stack justifyContent="center">
        <Typography variant="body1" textAlign="center">
            x{count}
        </Typography>
    </Stack>
</TableCell>
<TableCell>
    <IconButton onClick={() => onDeleteClick({ _id, images, name, price })}>
        <IoCloseOutline />
    </IconButton>
</TableCell>
</TableRow> */
}
