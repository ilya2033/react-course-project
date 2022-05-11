import { Route, Router, Routes, useNavigate, useParams } from 'react-router-dom';

import { Container, Box, Stack, Grid } from '@mui/material';

import { Aside } from '../layout/Aside';
import Content from '../layout/Content';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

import { store } from '../../reducers';
import { Header } from '../layout/Header';
import { Footer } from '../layout/Footer';
import { MainPage } from '../MainPage';
import { actionPageStart } from '../../actions/actionPageStart';
import { CGoodsPage } from '../GoodsPage';
import { useDispatch, useSelector } from 'react-redux';
import { actionCatById } from '../../actions/actionCatById';
import { CartPage } from '../CartPage';
import { actionGoodById } from '../../actions/actionGoodById';
import { GoodPage } from '../GoodPage';

const GoodsPageContainer = () => {
    const params = useParams();
    const dispatch = useDispatch();
    dispatch(actionCatById(params._id));

    return <CGoodsPage />;
};

const GoodPageContainer = () => {
    const params = useParams();
    const dispatch = useDispatch();
    dispatch(actionGoodById(params._id));
    return <GoodPage />;
};

const Root = ({ user = {} }) => {
    const isSignIn = true;
    const dispatch = useDispatch();
    dispatch(actionPageStart());

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
                            <Route path="/cart" exact element={<CartPage />} />
                            <Route path="/category/:_id" element={<GoodsPageContainer />} />
                            <Route path="/category/" element={<GoodsPageContainer />} />
                            <Route path="/good/:id" element={<GoodPageContainer />} />
                            {/*


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
