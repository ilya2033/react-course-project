import { Box, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

export const SubCategories = ({ categories }) => (
    <Box className="SubCategories">
        {(categories || []).map((cat) => (
            <Paper className="SubCategory Link" component={Link} to={`/category/${cat._id}`}>
                {cat.name}
            </Paper>
        ))}
    </Box>
);
