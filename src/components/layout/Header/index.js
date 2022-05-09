import { AppBar, Box, Button, IconButton, Stack, TextField, Toolbar, Typography } from '@mui/material';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { ReactComponent as ShoppingLogo } from '../../../images/shopping-logo.svg';
import { SearchBar } from '../../common/SearchBar';

const Header = () => (
    <Box className="Header">
        <AppBar position="static" className="AppBar">
            <Toolbar variant="dense" className="ToolBar">
                <IconButton>
                    <ShoppingLogo className="Logo" />
                </IconButton>
                <Stack direction="row" spacing={2}>
                    <Button variant="text" color="inherit">
                        <Typography variant="body1" component="div">
                            Головна
                        </Typography>
                    </Button>
                    <Button variant="text" color="inherit">
                        <Typography variant="body1" component="div">
                            Товари
                        </Typography>
                    </Button>
                    <Button variant="text" color="inherit">
                        <Typography variant="body1" component="div">
                            Зворотній зв'язок
                        </Typography>
                    </Button>
                </Stack>
                <Box className="SearchBarWrapper">
                    <SearchBar />
                </Box>

                <IconButton color="inherit" className="CartLogoButton">
                    <MdOutlineShoppingCart className="CartLogo" />
                </IconButton>
            </Toolbar>
        </AppBar>
    </Box>
);

export { Header };
