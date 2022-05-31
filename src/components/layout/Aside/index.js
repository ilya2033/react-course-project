import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { statusOptions } from '../../../helpers';
import { AdminCategories } from './AdminCategories';

import { CCategories } from './CCategories';
import { StatusOptions } from './StatusOptions';

const Aside = ({ children }) => (
    <Box className="Aside">
        <Box className="body">
            <Routes>
                <Route path="/admin/*" element={<AdminCategories />} />
                <Route path="/*" element={<CCategories />} />
            </Routes>

            {children}
        </Box>

        <Routes>
            <Route
                path="/admin/orders"
                exact
                element={
                    <Box className="body" mt={4}>
                        <StatusOptions options={statusOptions}></StatusOptions>
                    </Box>
                }
            />
        </Routes>
    </Box>
);

export { Aside };
