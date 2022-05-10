import { Route, Router, Routes } from 'react-router-dom';

import { Container, Box, Stack, Grid } from '@mui/material';

import { Aside } from '../layout/Aside';
import Content from '../layout/Content';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

import { store } from '../../reducers';
import { Header } from '../layout/Header';
import { Footer } from '../layout/Footer';
import { MainPage } from '../MainPage';
import { actionPageStart } from '../../actions/actionPageStart';

const Root = ({ user = {} }) => {
    const isSignIn = true;
    store.dispatch(actionPageStart());

    return (
        <Box className="Root">
            <Header />
            <Grid container columns={14} rows={1}>
                <Grid xs={3} item>
                    <Aside />
                </Grid>
                <Grid xs={11} item>
                    <Content>
                        <Routes>
                            <Route path="/" exact element={<MainPage />} />
                            {/* <Route path="/good/:id" />
                        <Route path="/category/:id" />
                        <Route path="/category/" />
                        <Route path="/good/" />

                        <CProtectedRoute path="/admin" component={AdminLayoutPage} roles={['admin']} /> */}
                        </Routes>
                    </Content>
                </Grid>
            </Grid>

            <Footer />
        </Box>
    );
};

export { Root };
