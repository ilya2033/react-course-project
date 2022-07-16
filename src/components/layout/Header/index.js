import { AppBar, Box, Button, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { createSearchParams, Link, useNavigate, useSearchParams } from "react-router-dom";
import { ReactComponent as ShoppingLogo } from "../../../images/shopping-logo.svg";
import { AuthModal } from "../../common/AuthModal";
import { DrawerCart } from "../../common/DrawerCart/DrawerCart";
import { CSearchBar } from "../../common/SearchBar";
import { CSearchResults } from "../../common/SearchBar/SearchResults";
import { AvatarButton } from "./AvatarButton";
import { CCartIcon } from "./CartIcon";
import { LogoutIcon } from "./LogoutIcon";

const Header = () => {
    const rootCats = useSelector((state) => state?.promise?.rootCats?.payload || []);
    const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const token = useSelector((state) => state?.auth?.token || null);

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
                        <Button variant="text" color="inherit" component={Link} to={rootCats[0] ? `/category/${rootCats[0]._id}` : "/"}>
                            <Typography variant="body1" component="div">
                                Товари
                            </Typography>
                        </Button>
                    </Stack>
                    <Box className="SearchBarWrapper">
                        <CSearchBar
                            render={CSearchResults}
                            renderParams={{ itemLink: "/good/" }}
                            searchLink="/goods/search"
                            onSearchButtonClick={(text) => {
                                searchParams.set("text", text);
                                setSearchParams(searchParams);
                                navigate({ pathname: "/goods/search", search: createSearchParams(searchParams).toString() });
                            }}
                        />
                    </Box>
                    <Stack direction="row" spacing={3}>
                        {token ? (
                            <Stack direction="row" spacing={3}>
                                <LogoutIcon />
                                <AvatarButton onClick={() => navigate("/dashboard/")} />
                            </Stack>
                        ) : (
                            <Button variant="text" color="inherit" onClick={() => setIsAuthModalOpen(true)}>
                                <Typography variant="body1" component="div">
                                    Увійти
                                </Typography>
                            </Button>
                        )}
                        <IconButton color="inherit" className="CartLogoButton" onClick={() => setIsCartDrawerOpen(true)}>
                            <Box>
                                <CCartIcon />
                            </Box>
                        </IconButton>
                    </Stack>
                </Toolbar>
            </AppBar>
            <DrawerCart isOpen={isCartDrawerOpen} onClose={() => setIsCartDrawerOpen(false)} />
            <AuthModal open={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </Box>
    );
};

export { Header };
