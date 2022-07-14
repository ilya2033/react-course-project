import { Box, Grid } from "@mui/material";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import { actionGoodById } from "../../actions/actionGoodById";
import { actionGoodsPopular } from "../../actions/actionGoodsPopular";
import { actionOrders } from "../../actions/actionOrders";
import { AdminLayoutPage } from "../admin/AdminLayoutPage";
import { CCartPage } from "../CartPage";
import { GoodList } from "../common/GoodList";
import { CProtectedRoute } from "../common/ProtectedRoute";
import { CDashboardPage } from "../DashboardPage";
import { GoodPage } from "../GoodPage";
import { Aside } from "../layout/Aside";
import Content from "../layout/Content";
import { Footer } from "../layout/Footer";
import { Header } from "../layout/Header";
import { MainPage } from "../MainPage";
import { CAdminGoodsPageContainer } from "./GoodsPageContainer";
import { CAdminGoodsSearchPageContainer } from "./GoodsSearchPageContainer";

const GoodPageContainer = ({ onLoad }) => {
    const params = useParams();
    useEffect(() => {
        onLoad({ _id: params._id });
    }, []);

    return <GoodPage />;
};

const CGoodPageContainer = connect(null, {
    onLoad: ({ _id }) => actionGoodById({ _id }),
})(GoodPageContainer);

const DashboardPageContainer = ({ onLoad }) => {
    useEffect(() => {
        onLoad();
    }, []);

    return <CDashboardPage />;
};

const CDashboardPageContainer = connect(null, {
    onLoad: () => actionOrders(),
})(DashboardPageContainer);

const CGoodsList = connect((state) => ({ goods: state.promise?.pageGoodsFind?.payload || [] }))(GoodList);

const GoodsListContainer = ({ onLoad }) => {
    const params = useParams();

    useEffect(() => {
        onLoad({ text: params.searchData, promiseName: "pageGoodsFind" });
    }, [params.searchData]);

    return <CGoodsList />;
};

const CGoodsListContainer = connect(null, {
    onLoad: ({ text, promiseName }) => actionOrders({ text, promiseName }),
})(GoodsListContainer);

const MainPageContainer = ({ onLoad, goods }) => {
    useEffect(() => {
        onLoad();
    }, []);

    return <MainPage goods={goods || []} />;
};

const CMainPageContainer = connect((state) => ({ goods: state.promise?.goodsPopular?.payload || [] }), {
    onLoad: () => actionGoodsPopular(),
})(MainPageContainer);

export const LayoutPage = () => {
    const location = useLocation();
    return (
        <Box className="LayoutPage">
            <Header />
            <Grid container columns={14} rows={1}>
                {!!location.pathname.match(/(\/categor)|(\/good)|(\/order)|(\/admin)+/) && (
                    <Grid xs={3} item>
                        <Aside />
                    </Grid>
                )}
                <Grid xs={location.pathname.match(/(\/categor)|(\/good)|(\/order)|(\/admin)+/) ? 11 : 14} item>
                    <Content>
                        <Routes>
                            <Route path="/" exact element={<CMainPageContainer />} />
                            <Route
                                path="/cart"
                                exact
                                element={
                                    <CProtectedRoute roles={["active"]} fallback="/auth">
                                        <CCartPage />
                                    </CProtectedRoute>
                                }
                            />
                            {/* <Route path="/search/:searchData/" element={<CGoodsListContainer />} exact /> */}
                            <Route path="/category/:_id" element={<CAdminGoodsPageContainer />} />
                            <Route path="/good/:_id" element={<CGoodPageContainer />} />
                            <Route path="/goods/search" element={<CAdminGoodsSearchPageContainer />} />
                            <Route
                                path="/admin/*"
                                exact
                                element={
                                    <CProtectedRoute roles={["admin"]} fallback="/auth">
                                        <AdminLayoutPage />
                                    </CProtectedRoute>
                                }
                            />
                            <Route
                                path="/dashboard/"
                                exact
                                element={
                                    <CProtectedRoute roles={["active"]} fallback="/">
                                        <CDashboardPageContainer />
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
