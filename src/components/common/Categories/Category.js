import { Divider, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

export const Category = ({ category = {} }) => (
    <Fragment>
        <ListItem disablePadding>
            <ListItemButton component={Link} to={`/category/${category._id}`}>
                <ListItemText primary={category.name || ''} />
            </ListItemButton>
        </ListItem>
        <Divider />
    </Fragment>
);
