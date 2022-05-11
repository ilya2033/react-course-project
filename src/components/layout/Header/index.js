import { AppBar, Box, Button, IconButton, Stack, TextField, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReactComponent as ShoppingLogo } from '../../../images/shopping-logo.svg';
import { DrawerCart } from '../../common/DrawerCart/DrawerCart';
import { SearchBar } from '../../common/SearchBar';
import { CCartIcon } from './CartIcon';

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
                        <Box onClick={() => setIsCartDrawerOpen(true)}>
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
