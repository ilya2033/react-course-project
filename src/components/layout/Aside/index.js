import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { AdminCategories } from './AdminCategories';

import { CCategories } from './CCategories';

const Aside = ({ children }) => (
    <Box className="Aside">
        <Box className="body">
            <Routes>
                <Route path="/admin/*" element={<AdminCategories />} />
                <Route path="/*" element={<CCategories />} />
            </Routes>
            {children}
        </Box>
    </Box>
);

export { Aside };
