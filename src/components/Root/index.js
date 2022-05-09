import { Route, Router, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Container, Box, Stack } from '@mui/material';
import { Fragment } from 'react';
import { CProtectedRoute } from '../common/ProtectedRoute';
import { AdminLayoutPage } from '../admin/AdminLayoutPage';
import { actionRootCats } from '../../actions/actionRootCats';
import { Aside } from '../layout/Aside';
import Content from '../layout/Content';

import { store } from '../../reducers';
import { Header } from '../layout/Header';
import { Footer } from '../layout/Footer';

const Root = ({ user = {} }) => {
    const isSignIn = true;
    store.dispatch(actionRootCats());

    return (
        <Box className="Root">
            <Header />
            <Stack direction="row">
                <Aside />
                <Content>
                    {/* <Routes>
                        <Route path="/" exact />
                        <Route path="/good/:id" />
                        <Route path="/category/:id" />
                        <Route path="/category/" />
                        <Route path="/good/" />

                        <CProtectedRoute path="/admin" component={AdminLayoutPage} roles={['admin']} />
                    </Routes> */}
                </Content>
            </Stack>
            <Footer />
        </Box>
    );
};

export { Root };
