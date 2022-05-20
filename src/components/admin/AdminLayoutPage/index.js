import { Box, Container } from '@mui/material';
import { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { actionGoodById } from '../../../actions/actionGoodById';
import { actionCatById } from '../../../actions/actionCatById';
import { actionPromiseClear, store, actionFeedCats } from '../../../reducers';
import { actionFeedAdd, actionFeedClear, actionFeedGoods, actionFeedOrders } from '../../../reducers/feedReducer';
import { CProtectedRoute } from '../../common/ProtectedRoute';
import { CAdminGoodPage } from '../AdminGoodPage';
import { AdminGoodsPage } from '../AdminGoodsPage';
import { AdminCategoriesPage } from '../AdminCategoriesPage';
import { CAdminCategoryPage } from '../AdminCategoryPage';
import { AdminOrdersPage } from '../AdminOrdersPage';
import { CAdminOrderPage } from '../AdminOrderPage';
import { actionOrderById } from '../../../actions/actionOrderById';

const AdminCategoryPageContainer = ({}) => {
    const dispatch = useDispatch();
    const params = useParams();
    useEffect(() => {
        if (params._id) {
            dispatch(actionCatById({ _id: params._id, promiseName: 'adminCatById' }));
        } else {
            dispatch(actionPromiseClear('adminCatById'));
        }
    }, [params._id]);
    return <CAdminCategoryPage />;
};

const AdminCategoriesPageContainer = ({ cats }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actionFeedCats(cats?.length || 0));
        window.onscroll = (e) => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                const {
                    feed,
                    promise: { feedCatAll },
                } = store.getState();
                if (feedCatAll.status !== 'PENDING') {
                    dispatch(actionFeedCats(feed.payload?.length || 0));
                }
            }
        };
        return () => {
            dispatch(actionFeedClear());
            dispatch(actionPromiseClear('feedCatAll'));

            dispatch(actionPromiseClear('categoryUpsert'));
            window.onscroll = null;
        };
    }, []);

    useEffect(() => {
        if (cats.length) dispatch(actionFeedAdd(cats));
    }, [cats]);
    return <AdminCategoriesPage />;
};

const AdminGoodPageContainer = () => {
    const params = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        if (params._id) {
            dispatch(actionGoodById({ _id: params._id, promiseName: 'adminGoodById' }));
        } else {
            dispatch(actionGoodById('adminGoodById'));
        }
    }, [params._id]);
    return <CAdminGoodPage />;
};

const AdminGoodsPageContainer = ({ goods }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actionFeedGoods());
        window.onscroll = (e) => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                const {
                    feed,
                    promise: { feedGoodsAll },
                } = store.getState();

                if (feedGoodsAll.status !== 'PENDING') {
                    dispatch(actionFeedGoods(feed.payload?.length || 0));
                }
            }
        };
        return () => {
            dispatch(actionFeedClear());
            dispatch(actionPromiseClear('feedGoodsAll'));
            dispatch(actionPromiseClear('goodUpsert'));
            window.onscroll = null;
        };
    }, []);

    useEffect(() => {
        if (goods?.length) store.dispatch(actionFeedAdd(goods));
    }, [goods]);
    return <AdminGoodsPage />;
};

const AdminOrdersPageContainer = ({ orders }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actionFeedOrders());
        window.onscroll = (e) => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                const {
                    feed,
                    promise: { feedOrdersAll },
                } = store.getState();

                if (feedOrdersAll.status !== 'PENDING') {
                    dispatch(actionFeedOrders(feed.payload?.length || 0));
                }
            }
        };
        return () => {
            dispatch(actionFeedClear());
            dispatch(actionPromiseClear('feedOrdersAll'));
            dispatch(actionPromiseClear('orderUpsert'));
            window.onscroll = null;
        };
    }, []);

    useEffect(() => {
        if (orders?.length) store.dispatch(actionFeedAdd(orders));
    }, [orders]);
    return <AdminOrdersPage />;
};

const AdminOrderPageContainer = () => {
    const params = useParams();
    const dispatch = useDispatch();
    dispatch(actionPromiseClear('adminOrderById'));
    useEffect(() => {
        if (params._id) {
            dispatch(actionOrderById({ _id: params._id, promiseName: 'adminOrderById' }));
        } else {
            dispatch(actionOrderById('adminOrderById'));
        }
    }, [params._id]);
    return <CAdminOrderPage />;
};

const CAdminGoodsPageContainer = connect((state) => ({ goods: state.promise?.feedGoodsAll?.payload || [] }))(
    AdminGoodsPageContainer
);

const CAdminOrdersPageContainer = connect((state) => ({ orders: state.promise?.feedOrdersAll?.payload || [] }))(
    AdminOrdersPageContainer
);

const CAdminCategoriesPageContainer = connect((state) => ({ cats: state.promise?.feedCatAll?.payload || [] }))(
    AdminCategoriesPageContainer
);

const AdminLayoutPage = () => {
    return (
        <Box className="AdminLayoutPage">
            <Routes>
                <Route path="/" element={<Navigate to={'/admin/goods/'} />} exact />
                <Route path="/goods/" element={<CAdminGoodsPageContainer />} />
                <Route path="/good/" element={<AdminGoodPageContainer />} />
                <Route path="/good/:_id" element={<AdminGoodPageContainer />} />
                <Route path="/categories/" element={<CAdminCategoriesPageContainer />} />
                <Route path="/category/" element={<AdminCategoryPageContainer />} />
                <Route path="/category/:_id" element={<AdminCategoryPageContainer />} />
                <Route path="/orders/" element={<CAdminOrdersPageContainer />} />
                <Route path="/order/" element={<AdminOrderPageContainer />} />
                <Route path="/order/:_id" element={<AdminOrderPageContainer />} />
            </Routes>
        </Box>
    );
};

export { AdminLayoutPage };
