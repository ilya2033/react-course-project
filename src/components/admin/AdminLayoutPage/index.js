import { Box, Container } from '@mui/material';
import { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useParams } from 'react-router-dom';
import { actionGoodById } from '../../../actions/actionGoodById';
import { actionCatById } from '../../../actions/actionCatById';
import { actionPromiseClear, store, actionFeedCats } from '../../../reducers';
import { actionFeedAdd, actionFeedClear, actionFeedGoods } from '../../../reducers/feedReducer';
import { CProtectedRoute } from '../../common/ProtectedRoute';
import { CAdminGoodPage } from '../AdminGoodPage';
import { AdminGoodsPage } from '../AdminGoodsPage';
import { AdminCategoriesPage } from '../AdminCategoriesPage';
import { CAdminCategoryPage } from '../AdminCategoryPage';

const AdminCategoryPageContainer = ({}) => {
    const dispatch = useDispatch();
    const params = useParams();
    useEffect(() => {
        if (params._id) {
            dispatch(actionCatById(params._id, 'adminCatById'));
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

const CAdminGoodsPageContainer = connect((state) => ({ goods: state.promise?.feedGoodsAll?.payload || [] }))(
    AdminGoodsPageContainer
);

const CAdminCategoriesPageContainer = connect((state) => ({ cats: state.promise?.feedCatAll?.payload || [] }))(
    AdminCategoriesPageContainer
);

const AdminLayoutPage = () => {
    return (
        <Box className="AdminLayoutPage">
            <Routes>
                <Route path="/goods/" element={<CAdminGoodsPageContainer />} />
                <Route path="/good/" element={<AdminGoodPageContainer />} />
                <Route path="/good/:_id" element={<AdminGoodPageContainer />} />
                <Route path="/categories/" element={<CAdminCategoriesPageContainer />} />
                <Route path="/category/" element={<AdminCategoryPageContainer />} />
                <Route path="/category/:_id" element={<AdminCategoryPageContainer />} />
            </Routes>
        </Box>
    );
};

export { AdminLayoutPage };
