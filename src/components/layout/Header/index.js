import { AppBar, Box, Button, IconButton, Stack, TextField, Toolbar, Typography } from "@mui/material";
import { useState } from "react";

import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ReactComponent as ShoppingLogo } from "../../../images/shopping-logo.svg";
import { AuthModal } from "../../common/AuthModal";
import { Ava } from "../../common/Ava";
import { DrawerCart } from "../../common/DrawerCart/DrawerCart";
import { CSearchBar, SearchBar } from "../../common/SearchBar";
import { CSearchResults } from "../../common/SearchBar/SearchResults";
import { AvatarButton } from "./AvatarButton";
import { CCartIcon } from "./CartIcon";
import { LogoutIcon } from "./LogoutIcon";

const Header = () => {
  const rootCats = useSelector((state) => state?.promise?.rootCats?.payload || []);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const navigate = useNavigate();
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
            <CSearchBar render={CSearchResults} renderParams={{ itemLink: "/good/" }} />
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
