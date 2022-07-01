import { Box, Button, Stack, Typography } from '@mui/material';
import { Modal } from '../Modal';

export const ConfirmModal = ({ open, text, onYES, onNO, onClose }) => {
    return (
        <Box className="ConfirmModal">
            <Modal open={open} onClose={() => onClose && onClose()} maxWidth={350}>
                <Typography textAlign="center" variant="h5">
                    {text}
                </Typography>
                <Stack direction="row" justifyContent="space-between" mt={4}>
                    <Button variant="contained" onClick={() => onNO && onNO()} color="error">
                        Ні
                    </Button>
                    <Button variant="contained" onClick={() => onYES && onYES()}>
                        Так
                    </Button>
                </Stack>
            </Modal>
        </Box>
    );
};
