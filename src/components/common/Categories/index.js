import { Paper, List, ListItem, ListItemButton, ListItemText, Box } from '@mui/material';
import { useEffect } from 'react';
import { Category } from './Category';

const Categories = ({ categories = [] }) => {
    return (
        <Box className="Categories">
            <List>
                {(categories || []).map((cat) => (
                    <Category category={cat} key={cat._id} />
                ))}
            </List>
        </Box>
    );
};

export { Categories };
