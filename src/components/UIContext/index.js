import { Alert, Snackbar } from '@mui/material';
import { createContext, useState } from 'react';

export const UIContext = createContext({});

export const UIContextProvider = ({ children }) => {
    const [alert, setAlert] = useState({
        show: false,
        severity: 'info',
        message: '',
    });

    const [snackbar, setSnackbar] = useState({
        show: false,
        anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
        message: '',
    });
    const handleAlertClose = () =>
        setAlert({
            show: false,
        });

    const handleSnackbarClose = () => {
        setSnackbar({
            show: false,
        });
    };

    return (
        <UIContext.Provider value={{ setAlert, setSnackbar }}>
            {children}
            <Snackbar open={alert.show} autoHideDuration={4000} onClose={handleAlertClose}>
                <Alert elevation={6} variant="filled" severity={alert.severity}>
                    {alert.message}
                </Alert>
            </Snackbar>
            <Snackbar
                open={snackbar.show}
                autoHideDuration={4000}
                onClose={handleSnackbarClose}
                anchorOrigin={snackbar.anchorOrigin || { horizontal: 'center', vertical: 'bottom' }}
                message={snackbar.message}
            >
                {snackbar.children}
            </Snackbar>
        </UIContext.Provider>
    );
};
