import { Paper, List, ListItem, ListItemButton, ListItemText, Box } from '@mui/material';
import { useEffect } from 'react';
import { Category } from './Category';

const Categories = ({ categories = [], url = '/category/' }) => {
    return (
        <Box className="Categories">
            <List>
                {(categories || []).map((cat) => (
                    <Box key={cat._id}>
                        <Category category={cat} url={url} />
                    </Box>
                ))}
            </List>
        </Box>
    );
};

export { Categories };
