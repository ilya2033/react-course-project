import { Box, Grid } from "@mui/material";
import { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation, useParams, useSearchParams } from "react-router-dom";
import { actionCatById } from "../../actions/actionCatById";
import { actionGoodById } from "../../actions/actionGoodById";
import { actionGoodsFind } from "../../actions/actionGoodsFind";
import { actionOrders } from "../../actions/actionOrders";
import { actionPromiseClear, store } from "../../reducers";
import { actionFeedAdd, actionFeedCategoryGoods, actionFeedClear, actionFeedGoodsFind } from "../../reducers/feedReducer";
import { AdminLayoutPage } from "../admin/AdminLayoutPage";
import { CCartPage } from "../CartPage";
import { GoodList } from "../common/GoodList";
import { CProtectedRoute } from "../common/ProtectedRoute";
import { CDashboardPage } from "../DashboardPage";
import { GoodPage } from "../GoodPage";
import { CGoodsPage, GoodsPage } from "../GoodsPage";
import { Aside } from "../layout/Aside";
import Content from "../layout/Content";
import { Footer } from "../layout/Footer";
import { Header } from "../layout/Header";
import { MainPage } from "../MainPage";

const GoodsPageContainer = () => {
    const params = useParams();
    const category = useSelector((state) => state.promise?.catById?.payload || null);
    const goods = useSelector((state) => state.promise?.feedCategoryGoods?.payload || []);
    const feed = useSelector((state) => state.feed?.payload || []);
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const orderBy = searchParams.get("orderBy") || "_id";

    useEffect(() => {
        if (params._id) {
            dispatch(actionCatById({ _id: params._id }));
        }

        return () => {
            dispatch(actionPromiseClear("catById"));
        };
    }, [params._id]);

    useEffect(() => {
        dispatch(actionFeedClear());
        dispatch(actionPromiseClear("feedCategoryGoods"));
        dispatch(actionFeedCategoryGoods({ category, orderBy, skip: 0 }));
    }, [orderBy, category]);

    useEffect(() => {
        dispatch(actionFeedCategoryGoods({ skip: goods?.length || 0, orderBy }));
        window.onscroll = (e) => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                const {
                    feed,
                    promise: { feedCategoryGoods },
                } = store.getState();

                if (feedCategoryGoods.status !== "PENDING") {
                    dispatch(actionFeedCategoryGoods({ skip: feed.payload?.length || 0, orderBy }));
                }
            }
        };
        return () => {
            dispatch(actionFeedClear());
            dispatch(actionPromiseClear("feedCategoryGoods"));
            window.onscroll = null;
        };
    }, []);

    useEffect(() => {
        if (goods?.length) store.dispatch(actionFeedAdd(goods));
    }, [goods]);
    return <CGoodsPage goods={feed} />;
};

const GoodsSearchPageContainer = () => {
    const goods = useSelector((state) => state.promise?.feedGoodsFind?.payload || []);
    const feed = useSelector((state) => state.feed?.payload || []);
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const orderBy = searchParams.get("orderBy") || "_id";
    const text = searchParams.get("text") || "";

    useEffect(() => {
        dispatch(actionFeedClear());
        dispatch(actionPromiseClear("feedGoodsFind"));
        dispatch(actionFeedGoodsFind({ text, orderBy, skip: 0 }));
    }, [orderBy, text]);

    useEffect(() => {
        dispatch(actionFeedGoodsFind({ text, skip: goods?.length || 0, orderBy }));
        window.onscroll = (e) => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                const {
                    feed,
                    promise: { feedGoodsFind },
                } = store.getState();

                if (feedGoodsFind.status !== "PENDING") {
                    dispatch(actionFeedGoodsFind({ text, skip: feed.payload?.length || 0, orderBy }));
                }
            }
        };
        return () => {
            dispatch(actionFeedClear());
            dispatch(actionPromiseClear("feedGoodsFind"));
            window.onscroll = null;
        };
    }, []);

    useEffect(() => {
        if (goods?.length) store.dispatch(actionFeedAdd(goods));
    }, [goods]);

    return <GoodsPage goods={feed} />;
};

const GoodPageContainer = () => {
    const params = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actionGoodById({ _id: params._id }));
    }, []);

    return <GoodPage />;
};

const DashboardPageContainer = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actionOrders());
    }, []);

    return <CDashboardPage />;
};

const CGoodsList = connect((state) => ({ goods: state.promise?.pageGoodsFind?.payload || [] }))(GoodList);

const GoodsListContainer = () => {
    const params = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actionGoodsFind({ text: params.searchData, promiseName: "pageGoodsFind" }));
    }, [params.searchData]);

    return <CGoodsList />;
};

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
                            <Route path="/" exact element={<MainPage />} />
                            <Route
                                path="/cart"
                                exact
                                element={
                                    <CProtectedRoute roles={["user"]} fallback="/auth">
                                        <CCartPage />
                                    </CProtectedRoute>
                                }
                            />
                            <Route path="/search/:searchData/" element={<GoodsListContainer />} exact />
                            <Route path="/category/:_id" element={<GoodsPageContainer />} />
                            <Route path="/category/" element={<GoodsPageContainer />} />
                            <Route path="/good/:_id" element={<GoodPageContainer />} />
                            <Route path="/goods/search" element={<GoodsSearchPageContainer />} />
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
                                    <CProtectedRoute roles={["user"]} fallback="/">
                                        <DashboardPageContainer />
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
