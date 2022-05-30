import { Box, Button, Menu, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { sortOptions } from '../../../helpers/sortOptions';

export const SortOptions = ({ onClick, options = sortOptions || [] } = {}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedOption, setSelectedOption] = useState(options[0] || null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleSelect = (option) => {
        option && setSelectedOption(option);
        setAnchorEl(null);
    };

    useEffect(() => {
        if (selectedOption) {
            onClick(selectedOption);
        }
    }, [selectedOption]);

    return (
        <Box className="SortOptions">
            <Button
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                {selectedOption.label}
            </Button>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                {(options || []).map((option) => (
                    <MenuItem key={option.value} onClick={(e) => handleSelect(option)}>
                        {option.label}
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
};
