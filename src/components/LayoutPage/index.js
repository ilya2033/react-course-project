import { Box, Grid } from '@mui/material';
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { actionCatById } from '../../actions/actionCatById';
import { actionGoodById } from '../../actions/actionGoodById';
import { actionGoodsFind } from '../../actions/actionGoodsFind';
import { AdminLayoutPage } from '../admin/AdminLayoutPage';
import { CartPage } from '../CartPage';
import { Error404 } from '../common/Error404';
import { GoodList } from '../common/GoodList';
import { CProtectedRoute, ProtectedRoute } from '../common/ProtectedRoute';
import { GoodPage } from '../GoodPage';
import { CGoodsPage } from '../GoodsPage';
import { Aside } from '../layout/Aside';
import Content from '../layout/Content';
import { Footer } from '../layout/Footer';
import { Header } from '../layout/Header';
import { MainPage } from '../MainPage';

const GoodsPageContainer = () => {
    const params = useParams();
    const dispatch = useDispatch();
    if (params._id) {
        dispatch(actionCatById({ _id: params._id }));
    }

    return <CGoodsPage />;
};

const GoodPageContainer = () => {
    const params = useParams();
    const dispatch = useDispatch();

    dispatch(actionGoodById({ _id: params._id }));
    return <GoodPage />;
};

const CGoodsList = connect((state) => ({ goods: state.promise?.pageGoodsFind?.payload || [] }))(GoodList);

const GoodsListContainer = () => {
    const params = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actionGoodsFind({ text: params.searchData, promiseName: 'pageGoodsFind' }));
    }, [params.searchData]);

    return <CGoodsList />;
};

export const LayoutPage = () => {
    const location = useLocation();
    return (
        <Box className="LayoutPage">
            <Header />
            <Grid container columns={14} rows={1}>
                {!!location.pathname.match(/(\/categor)|(\/good)|(\/order)+/) && (
                    <Grid xs={3} item>
                        <Aside />
                    </Grid>
                )}
                <Grid xs={location.pathname.match(/(\/categor)|(\/good)|(\/order)+/) ? 11 : 14} item>
                    <Content>
                        <Routes>
                            <Route path="/" exact element={<MainPage />} />
                            <Route path="/cart" exact element={<CartPage />} />
                            <Route path="/search/:searchData/" element={<GoodsListContainer />} exact />
                            <Route path="/category/:_id" element={<GoodsPageContainer />} />
                            <Route path="/category/" element={<GoodsPageContainer />} />
                            <Route path="/good/:_id" element={<GoodPageContainer />} />
                            <Route
                                path="/admin/*"
                                exact
                                element={
                                    <CProtectedRoute roles={['admin']} fallback="/auth">
                                        <AdminLayoutPage />
                                    </CProtectedRoute>
                                }
                            />
                            <Route path="*" element={<Navigate to="/404" />} />
                        </Routes>
                    </Content>
                </Grid>
            </Grid>
            <Footer />
        </Box>
    );
};
