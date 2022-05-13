import { Box, Container } from '@mui/material';
import { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { actionPromiseClear, store } from '../../../reducers';
import { actionFeedAdd, actionFeedClear, actionFeedGoods } from '../../../reducers/feedReducer';
import { CProtectedRoute } from '../../common/ProtectedRoute';
import { AdminGoodsPage } from '../AdminGoodsPage';

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

const AdminLayoutPage = () => {
    return (
        <Box className="AdminLayoutPage">
            <Routes>
                <Route path="/goods/" element={<CAdminGoodsPageContainer />} />
            </Routes>
        </Box>
    );
};

export { AdminLayoutPage };
