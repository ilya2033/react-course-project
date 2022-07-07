import { Box } from "@mui/material";
import { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useParams, useSearchParams } from "react-router-dom";
import { actionGoodById } from "../../../actions/actionGoodById";
import { actionCatById } from "../../../actions/actionCatById";
import {
    actionPromiseClear,
    store,
    actionFeedCats,
    actionFeedGoodsFind,
    actionFeedOrdersFind,
    actionFeedCatsFind,
} from "../../../reducers";
import { actionFeedAdd, actionFeedClear, actionFeedGoods, actionFeedOrders } from "../../../reducers/feedReducer";
import { CAdminGoodPage } from "../AdminGoodPage";
import { AdminGoodsPage } from "../AdminGoodsPage";
import { AdminCategoriesPage } from "../AdminCategoriesPage";
import { CAdminCategoryPage } from "../AdminCategoryPage";
import { AdminOrdersPage } from "../AdminOrdersPage";
import { CAdminOrderPage } from "../AdminOrderPage";
import { actionOrderById } from "../../../actions/actionOrderById";
import { actionCatAll } from "../../../actions/actionCatAll";
import { actionGoodsAll } from "../../../actions/actionGoodsAll";
import { CAdminCategoryTree } from "../AdminCategoryTree";
import { actionUsersAll } from "../../../actions/actionUsersAll";

const AdminCategoryPageContainer = ({}) => {
    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        dispatch(actionGoodsAll());

        return () => {
            dispatch(actionPromiseClear("goodsAll"));
            dispatch(actionPromiseClear("adminCatById"));
        };
    }, []);

    useEffect(() => {
        if (params._id) {
            dispatch(actionCatById({ _id: params._id, promiseName: "adminCatById" }));
        } else {
            dispatch(actionPromiseClear("adminCatById"));
        }
    }, [params._id]);
    return <CAdminCategoryPage />;
};

const AdminCategoriesPageContainer = ({ cats }) => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const orderBy = searchParams.get("orderBy") || "_id";

    useEffect(() => {
        dispatch(actionFeedClear());
        dispatch(actionPromiseClear("feedCatAll"));
        dispatch(actionPromiseClear("categoryUpsert"));
        dispatch(actionFeedCats({ skip: 0, orderBy }));
    }, [orderBy]);

    useEffect(() => {
        dispatch(actionFeedCats({ skip: cats?.length || 0, orderBy }));
        window.onscroll = (e) => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                const {
                    feed,
                    promise: { feedCatAll },
                } = store.getState();
                if (feedCatAll.status !== "PENDING") {
                    dispatch(actionFeedCats(feed.payload?.length || 0, orderBy));
                }
            }
        };
        return () => {
            dispatch(actionFeedClear());
            dispatch(actionPromiseClear("feedCatAll"));
            dispatch(actionPromiseClear("categoryUpsert"));
            window.onscroll = null;
        };
    }, []);

    useEffect(() => {
        if (cats.length) dispatch(actionFeedAdd(cats));
    }, [cats]);

    return <AdminCategoriesPage orderBy={orderBy} />;
};

const AdminCategoriesSearchPageContainer = () => {
    const categories = useSelector((state) => state.promise?.feedCatsFind?.payload || []);
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const orderBy = searchParams.get("orderBy") || "_id";
    const text = searchParams.get("text") || "";

    useEffect(() => {
        dispatch(actionFeedClear());
        dispatch(actionPromiseClear("feedCatsFind"));
        dispatch(actionFeedCatsFind({ text, orderBy, skip: 0 }));
    }, [orderBy, text]);

    useEffect(() => {
        dispatch(actionFeedCatsFind({ text, skip: categories?.length || 0, orderBy }));
        window.onscroll = (e) => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                const {
                    feed,
                    promise: { feedCatsFind },
                } = store.getState();

                if (feedCatsFind.status !== "PENDING") {
                    dispatch(actionFeedCatsFind({ text, skip: feed.payload?.length || 0, orderBy }));
                }
            }
        };
        return () => {
            dispatch(actionFeedClear());
            dispatch(actionPromiseClear("feedCatsFind"));
            window.onscroll = null;
        };
    }, []);

    useEffect(() => {
        if (categories?.length) store.dispatch(actionFeedAdd(categories));
    }, [categories]);

    return <AdminCategoriesPage orderBy={orderBy} />;
};

const AdminGoodPageContainer = () => {
    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actionCatAll());

        return () => {
            dispatch(actionPromiseClear("goodsCatAll"));
            dispatch(actionPromiseClear("adminGoodById"));
        };
    }, []);

    useEffect(() => {
        if (params._id) {
            dispatch(actionGoodById({ _id: params._id, promiseName: "adminGoodById" }));
        } else {
            dispatch(actionPromiseClear("adminGoodById"));
        }
    }, [params._id]);
    return <CAdminGoodPage />;
};

const AdminGoodsPageContainer = ({ goods }) => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const orderBy = searchParams.get("orderBy") || "_id";

    useEffect(() => {
        dispatch(actionFeedClear());
        dispatch(actionPromiseClear("feedGoodsAll"));
        dispatch(actionPromiseClear("goodUpsert"));
        dispatch(actionFeedGoods({ skip: 0, orderBy }));
    }, [orderBy]);

    useEffect(() => {
        dispatch(actionFeedGoods({ skip: goods?.length || 0, orderBy }));
        window.onscroll = (e) => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                const {
                    feed,
                    promise: { feedGoodsAll },
                } = store.getState();

                if (feedGoodsAll.status !== "PENDING") {
                    dispatch(actionFeedGoods({ skip: feed.payload?.length || 0, orderBy }));
                }
            }
        };
        return () => {
            dispatch(actionFeedClear());
            dispatch(actionPromiseClear("feedGoodsAll"));
            dispatch(actionPromiseClear("goodUpsert"));
            window.onscroll = null;
        };
    }, []);

    useEffect(() => {
        if (goods?.length) store.dispatch(actionFeedAdd(goods));
    }, [goods]);
    return <AdminGoodsPage orderBy={orderBy} />;
};

const AdminGoodsSearchPageContainer = () => {
    const goods = useSelector((state) => state.promise?.feedGoodsFind?.payload || []);
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

    return <AdminGoodsPage orderBy={orderBy} />;
};

const AdminOrdersPageContainer = ({ orders }) => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const orderBy = searchParams.get("orderBy") || "_id";
    const status = searchParams.get("status") || 0;

    useEffect(() => {
        dispatch(actionFeedClear());
        dispatch(actionPromiseClear("feedOrdersAll"));
        dispatch(actionPromiseClear("orderUpsert"));
        dispatch(actionFeedOrders({ skip: 0, orderBy, status }));
    }, [orderBy, status]);

    useEffect(() => {
        dispatch(actionFeedOrders({ skip: orders?.length || 0, orderBy, status }));
        window.onscroll = (e) => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                const {
                    feed,
                    promise: { feedOrdersAll },
                } = store.getState();

                if (feedOrdersAll.status !== "PENDING") {
                    dispatch(actionFeedOrders({ skip: feed.payload?.length || 0, orderBy, status }));
                }
            }
        };
        return () => {
            dispatch(actionFeedClear());
            dispatch(actionPromiseClear("feedOrdersAll"));
            dispatch(actionPromiseClear("orderUpsert"));
            window.onscroll = null;
        };
    }, []);

    useEffect(() => {
        if (orders?.length) store.dispatch(actionFeedAdd(orders));
    }, [orders]);
    return <AdminOrdersPage orderBy={orderBy} />;
};

const AdminOrdersSearchPageContainer = () => {
    const orders = useSelector((state) => state.promise?.feedOrdersFind?.payload || []);
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const orderBy = searchParams.get("orderBy") || "_id";
    const text = searchParams.get("text") || "";

    useEffect(() => {
        dispatch(actionFeedClear());
        dispatch(actionPromiseClear("feedOrdersFind"));
        dispatch(actionFeedOrdersFind({ text, orderBy, skip: 0 }));
    }, [orderBy, text]);

    useEffect(() => {
        dispatch(actionFeedOrdersFind({ text, skip: orders?.length || 0, orderBy }));
        window.onscroll = (e) => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
                const {
                    feed,
                    promise: { feedOrdersFind },
                } = store.getState();

                if (feedOrdersFind.status !== "PENDING") {
                    dispatch(actionFeedOrdersFind({ text, skip: feed.payload?.length || 0, orderBy }));
                }
            }
        };
        return () => {
            dispatch(actionFeedClear());
            dispatch(actionPromiseClear("feedOrdersFind"));
            window.onscroll = null;
        };
    }, []);

    useEffect(() => {
        if (orders?.length) store.dispatch(actionFeedAdd(orders));
    }, [orders]);

    return <AdminOrdersPage orderBy={orderBy} />;
};

const AdminOrderPageContainer = () => {
    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actionPromiseClear("adminOrderById"));
        dispatch(actionUsersAll());
        dispatch(actionGoodsAll());
        return () => {
            dispatch(actionPromiseClear("usersAll"));
            dispatch(actionPromiseClear("goodsAll"));
            dispatch(actionPromiseClear("adminOrderById"));
        };
    }, []);
    useEffect(() => {
        if (params._id) {
            dispatch(actionOrderById({ _id: params._id, promiseName: "adminOrderById" }));
        }
    }, [params._id]);
    return <CAdminOrderPage />;
};

const CAdminGoodsPageContainer = connect((state) => ({ goods: state.promise?.feedGoodsAll?.payload || [] }))(AdminGoodsPageContainer);

const CAdminOrdersPageContainer = connect((state) => ({ orders: state.promise?.feedOrdersAll?.payload || [] }))(AdminOrdersPageContainer);

const CAdminCategoriesPageContainer = connect((state) => ({ cats: state.promise?.feedCatAll?.payload || [] }))(
    AdminCategoriesPageContainer
);

const AdminLayoutPage = () => {
    return (
        <Box className="AdminLayoutPage">
            <Routes>
                <Route path="/" element={<Navigate to={"/admin/goods/"} />} />
                <Route path="/tree/" element={<CAdminCategoryTree />} />
                <Route path="/goods/" element={<CAdminGoodsPageContainer />} />
                <Route path="/goods/search" element={<AdminGoodsSearchPageContainer />} />
                <Route path="/good/" element={<AdminGoodPageContainer />} />
                <Route path="/good/:_id" element={<AdminGoodPageContainer />} />
                <Route path="/categories/" element={<CAdminCategoriesPageContainer />} />
                <Route path="/categories/search" element={<AdminCategoriesSearchPageContainer />} />
                <Route path="/category/" element={<AdminCategoryPageContainer />} />
                <Route path="/category/:_id" element={<AdminCategoryPageContainer />} />
                <Route path="/orders/" element={<CAdminOrdersPageContainer />} />
                <Route path="/orders/search" element={<AdminOrdersSearchPageContainer />} />
                <Route path="/order/" element={<AdminOrderPageContainer />} />
                <Route path="/order/:_id" element={<AdminOrderPageContainer />} />
                <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
        </Box>
    );
};

export { AdminLayoutPage };
