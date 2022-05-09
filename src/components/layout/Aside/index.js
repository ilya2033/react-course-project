import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

import { CCategories } from './CCategories';

const Aside = ({ children }) => (
    <Box className="Aside">
        <Box className="body">
            <Routes>
                {/* <Route path="/admin/" component={CAdminCategories} /> */}
                <Route path="/*" element={<CCategories />} />
            </Routes>
            {children}
        </Box>
    </Box>
);

export { Aside };
