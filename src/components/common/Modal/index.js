import { Box } from '@mui/system';
import ReactDOM from 'react-dom';

export const Modal = ({ children, open, onClose, maxWidth = 700 }) => {
    return open
        ? ReactDOM.createPortal(
              <Box className="Modal" onClick={() => onClose && onClose()}>
                  <Box className="modalContent" onClick={(e) => e.stopPropagation()} style={{ maxWidth }}>
                      {children}
                  </Box>
              </Box>,
              document.body
          )
        : null;
};
