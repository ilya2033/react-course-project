import { AppBar, Box, Button, IconButton, Stack, TextField, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReactComponent as ShoppingLogo } from '../../../images/shopping-logo.svg';
import { DrawerCart } from '../../common/DrawerCart/DrawerCart';
import { CSearchBar, SearchBar } from '../../common/SearchBar';
import { CSearchResults } from '../../common/SearchBar/SearchResults';
import { CCartIcon } from './CartIcon';
import { LogoutIcon } from './LogoutIcon';

const Header = () => {
    const rootCats = useSelector((state) => state?.promise?.rootCats?.payload || []);
    const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
    return (
        <Box className="Header">
            <AppBar position="static" className="AppBar">
                <Toolbar variant="dense" className="ToolBar">
                    <IconButton component={Link} to="/">
                        <ShoppingLogo className="Logo" />
                    </IconButton>
                    <Stack direction="row" spacing={2}>
                        <Button variant="text" color="inherit" component={Link} to="/">
                            <Typography variant="body1" component="div">
                                Головна
                            </Typography>
                        </Button>
                        <Button
                            variant="text"
                            color="inherit"
                            component={Link}
                            to={rootCats[0] ? `/category/${rootCats[0]._id}` : '/'}
                        >
                            <Typography variant="body1" component="div">
                                Товари
                            </Typography>
                        </Button>
                    </Stack>
                    <Box className="SearchBarWrapper">
                        <CSearchBar render={CSearchResults} renderParams={{ itemLink: '/good/' }} />
                    </Box>
                    <LogoutIcon />
                    <IconButton color="inherit" className="CartLogoButton" onClick={() => setIsCartDrawerOpen(true)}>
                        <Box>
                            <CCartIcon />
                        </Box>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <DrawerCart isOpen={isCartDrawerOpen} onClose={() => setIsCartDrawerOpen(false)} />
        </Box>
    );
};

export { Header };
