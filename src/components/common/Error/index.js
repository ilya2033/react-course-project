const { Typography } = require("@mui/material");

const Error = ({ children }) => (
    <Typography variant="body1" sx={{ textAlign: "center" }} className="error">
        {children}
    </Typography>
);

export { Error };
