import { Box } from "@mui/material";
import { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useParams, useSearchParams } from "react-router-dom";
import { actionGoodById } from "../../../actions/actionGoodById";
import {
    actionPromiseClear,
    store,
    actionFeedCats,
    actionFeedGoodsFind,
    actionFeedOrdersFind,
    actionFeedCatsFind,
} from "../../../reducers";
import {
    actionFeedAdd,
    actionFeedClear,
    actionFeedGoods,
    actionFeedOrders,
    actionFeedUsers,
    actionFeedUsersFind,
} from "../../../reducers/feedReducer";
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
import { AdminUsersPage } from "../AdminUsersPage";
import { CAdminUserPage } from "../AdminUserPage.js";
import { actionUserById } from "../../../actions/actionUserById";
import { actionAdminCategoryPage } from "../../../actions/actionAdminCategoryPage";
import { actionAdminCategoryPageClear } from "../../../actions/actionAdminCategoryPageClear";
import { actionAdminCategoriesPage } from "../../../actions/actionAdminCategoriesPage";
import { actionAdminCategoriesPageClear } from "../../../actions/actionAdminCategoriesPageClear";
import { actionAdminCategoriesSearchPageClear } from "../../../actions/actionAdminCategoriesSearchPageClear";
import { actionAdminCategoriesSearchPage } from "../../../actions/actionAdminCategoriesSearchPage";
import { actionAdminGoodsPageClear } from "../../../actions/actionAdminGoodsPageClear";
import { actionAdminGoodsPage } from "../../../actions/actionAdminGoodsPage";
import { actionAdminGoodPage } from "../../../actions/actionAdminGoodPage";
import { actionAdminGoodPageClear } from "../../../actions/actionAdminGoodPageClear";

const AdminCategoryTreePageContainer = ({ onLoad, onUnmount }) => {
    useEffect(() => {
        onLoad();
        return () => {
            onUnmount();
        };
    }, []);

    return <CAdminCategoryTree />;
};

const CAdminCategoryTreePageContainer = connect(null, {
    onUnmount: () => actionCatAll(),
    onLoad: () => actionPromiseClear("catAll"),
})(AdminCategoryTreePageContainer);

const AdminCategoryPageContainer = ({ onUnmount, onLoad }) => {
    const params = useParams();

    useEffect(() => {
        return () => {
            onUnmount();
        };
    }, []);

    useEffect(() => {
        onLoad(params._id);
    }, [params._id]);

    return <CAdminCategoryPage />;
};

const CAdminCategoryPageContainer = connect(null, {
    onUnmount: () => actionAdminCategoryPageClear(),
    onLoad: (_id) => actionAdminCategoryPage({ _id }),
})(AdminCategoryPageContainer);

const AdminCategoriesPageContainer = ({ feed, cats, promiseStatus, onLoad, onUnmount, onScroll }) => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const orderBy = searchParams.get("orderBy") || "_id";

    useEffect(() => {
        onLoad({ orderBy });
        return () => {
            onUnmount();
        };
    }, [orderBy]);

    useEffect(() => {
        window.onscroll = (e) => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
                if (promiseStatus !== "PENDING") {
                    onScroll({ feed, orderBy });
                }
            }
        };
        return () => {
            window.onscroll = null;
        };
    }, [feed, promiseStatus]);

    useEffect(() => {
        if (cats.length) dispatch(actionFeedAdd(cats));
    }, [cats]);

    return <AdminCategoriesPage orderBy={orderBy} />;
};

const CAdminCategoriesPageContainer = connect(
    (state) => ({
        cats: state.promise?.feedCatAll?.payload || [],
        feed: state.feed?.payload || [],
        promiseStatus: state.promise?.feedCatAll?.status || null,
    }),
    {
        onUnmount: () => actionAdminCategoriesPageClear(),
        onLoad: ({ orderBy }) => actionAdminCategoriesPage({ orderBy }),
        onScroll: ({ feed, orderBy }) => actionFeedCats({ skip: feed?.length || 0, orderBy }),
    }
)(AdminCategoriesPageContainer);

const AdminCategoriesSearchPageContainer = ({ feed, cats, promiseStatus, onLoad, onUnmount, onScroll }) => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const orderBy = searchParams.get("orderBy") || "_id";
    const text = searchParams.get("text") || "";

    useEffect(() => {
        onLoad({ orderBy, text });
        return () => {
            onUnmount();
        };
    }, [orderBy, text]);

    useEffect(() => {
        window.onscroll = (e) => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
                if (promiseStatus !== "PENDING") {
                    onScroll({ feed, orderBy, text });
                }
            }
        };
        return () => {
            window.onscroll = null;
        };
    }, [promiseStatus, feed, text]);

    useEffect(() => {
        if (cats?.length) dispatch(actionFeedAdd(cats));
    }, [cats]);

    return <AdminCategoriesPage orderBy={orderBy} />;
};

const CAdminCategoriesSearchPageContainer = connect(
    (state) => ({
        cats: state.promise?.feedCatsFind?.payload || [],
        feed: state.feed?.payload || [],
        promiseStatus: state.promise?.feedCatsFind?.status || null,
    }),
    {
        onUnmount: () => actionAdminCategoriesSearchPageClear(),
        onLoad: ({ orderBy, text }) => actionAdminCategoriesSearchPage({ orderBy, text }),
        onScroll: ({ feed, orderBy, text }) => actionFeedCatsFind({ text, skip: feed?.length || 0, orderBy }),
    }
)(AdminCategoriesSearchPageContainer);

const AdminGoodPageContainer = ({ onUnmount, onLoad }) => {
    const params = useParams();

    useEffect(() => {
        return () => {
            onUnmount();
        };
    }, []);

    useEffect(() => {
        onLoad(params._id);
    }, [params._id]);

    return <CAdminGoodPage />;
};

const CAdminGoodPageContainer = connect(null, {
    onUnmount: () => actionAdminGoodPageClear(),
    onLoad: (_id) => actionAdminGoodPage({ _id }),
})(AdminGoodPageContainer);

const AdminGoodsPageContainer = ({ feed, goods, promiseStatus, onLoad, onUnmount, onScroll }) => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const orderBy = searchParams.get("orderBy") || "_id";

    useEffect(() => {
        onLoad({ orderBy });
        return () => {
            onUnmount();
        };
    }, [orderBy]);

    useEffect(() => {
        window.onscroll = (e) => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
                if (promiseStatus !== "PENDING") {
                    onScroll({ feed, orderBy });
                }
            }
        };
        return () => {
            window.onscroll = null;
        };
    }, [promiseStatus, feed]);

    useEffect(() => {
        if (goods?.length) dispatch(actionFeedAdd(goods));
    }, [goods]);
    return <AdminGoodsPage orderBy={orderBy} />;
};

const CAdminGoodsPageContainer = connect(
    (state) => ({
        goods: state.promise?.feedGoodsAll?.payload || [],
        feed: state.feed?.payload || [],
        promiseStatus: state.promise?.feedGoodsAll?.status || null,
    }),
    {
        onUnmount: () => actionAdminGoodsPageClear(),
        onLoad: ({ orderBy }) => actionAdminGoodsPage({ orderBy }),
        onScroll: ({ feed, orderBy }) => actionFeedGoods({ skip: feed?.length || 0, orderBy }),
    }
)(AdminGoodsPageContainer);

const AdminGoodsSearchPageContainer = ({ feed, cats, promiseStatus, onLoad, onUnmount }) => {
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
        window.onscroll = (e) => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
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
        window.onscroll = (e) => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
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

const AdminUsersSearchPageContainer = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.promise?.feedUsersFind?.payload || []);
    const {
        feed,
        promise: { feedUsersFind },
    } = useSelector((state) => state);

    const [searchParams] = useSearchParams();
    const orderBy = searchParams.get("orderBy") || "_id";
    const text = searchParams.get("text") || "";

    useEffect(() => {
        dispatch(actionFeedClear());
        dispatch(actionPromiseClear("feedUsersFind"));
        dispatch(actionPromiseClear("userUpsert"));
        dispatch(actionFeedUsersFind({ skip: 0, orderBy, text }));
    }, [orderBy, text]);

    useEffect(() => {
        window.onscroll = (e) => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
                const {
                    feed,
                    promise: { feedUsersFind },
                } = store.getState();

                if (feedUsersFind.status !== "PENDING") {
                    dispatch(actionFeedUsersFind({ text, skip: feed.payload?.length || 0, orderBy }));
                }
            }
        };
        return () => {
            window.onscroll = null;
        };
    }, [feed, feedUsersFind]);

    useEffect(() => {
        if (users?.length) store.dispatch(actionFeedAdd(users));
    }, [users]);
    return <AdminUsersPage orderBy={orderBy} />;
};

const AdminUsersPageContainer = ({ users }) => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const orderBy = searchParams.get("orderBy") || "_id";

    useEffect(() => {
        dispatch(actionFeedClear());
        dispatch(actionPromiseClear("feedUsersAll"));
        dispatch(actionPromiseClear("userUpsert"));
        dispatch(actionFeedUsers({ skip: 0, orderBy }));
    }, [orderBy]);

    useEffect(() => {
        dispatch(actionFeedUsers({ skip: users?.length || 0, orderBy }));
        window.onscroll = (e) => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                const {
                    feed,
                    promise: { feedUsersAll },
                } = store.getState();

                if (feedUsersAll.status !== "PENDING") {
                    dispatch(actionFeedUsers({ skip: feed.payload?.length || 0, orderBy }));
                }
            }
        };
        return () => {
            dispatch(actionFeedClear());
            dispatch(actionPromiseClear("feedUsersAll"));
            dispatch(actionPromiseClear("userUpsert"));
            window.onscroll = null;
        };
    }, []);

    useEffect(() => {
        if (users?.length) store.dispatch(actionFeedAdd(users));
    }, [users]);
    return <AdminUsersPage orderBy={orderBy} />;
};

const AdminUserPageContainer = () => {
    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actionPromiseClear("adminUserById"));
        dispatch(actionPromiseClear("uploadFile"));
        return () => {
            dispatch(actionPromiseClear("adminUserById"));
            dispatch(actionPromiseClear("uploadFile"));
        };
    }, []);
    useEffect(() => {
        if (params._id) {
            dispatch(actionUserById({ _id: params._id, promiseName: "adminUserById" }));
        }
    }, [params._id]);
    return <CAdminUserPage />;
};

const CAdminOrdersPageContainer = connect((state) => ({ orders: state.promise?.feedOrdersAll?.payload || [] }))(AdminOrdersPageContainer);

const CAdminUsersPageContainer = connect((state) => ({ users: state.promise?.feedUsersAll?.payload || [] }))(AdminUsersPageContainer);

const AdminLayoutPage = () => {
    return (
        <Box className="AdminLayoutPage">
            <Routes>
                <Route path="/" element={<Navigate to={"/admin/goods/"} />} />
                <Route path="/tree/" element={<CAdminCategoryTreePageContainer />} />
                <Route path="/goods/" element={<CAdminGoodsPageContainer />} />
                <Route path="/goods/search" element={<AdminGoodsSearchPageContainer />} />
                <Route path="/good/" element={<CAdminGoodPageContainer />} />
                <Route path="/good/:_id" element={<CAdminGoodPageContainer />} />
                <Route path="/categories/" element={<CAdminCategoriesPageContainer />} />
                <Route path="/categories/search" element={<CAdminCategoriesSearchPageContainer />} />
                <Route path="/category/" element={<CAdminCategoryPageContainer />} />
                <Route path="/category/:_id" element={<CAdminCategoryPageContainer />} />
                <Route path="/orders/" element={<CAdminOrdersPageContainer />} />
                <Route path="/orders/search" element={<AdminOrdersSearchPageContainer />} />
                <Route path="/order/" element={<AdminOrderPageContainer />} />
                <Route path="/order/:_id" element={<AdminOrderPageContainer />} />
                <Route path="/users/search" element={<AdminUsersSearchPageContainer />} />
                <Route path="/users/" element={<CAdminUsersPageContainer />} />
                <Route path="/user/" element={<AdminUserPageContainer />} />
                <Route path="/user/:_id" element={<AdminUserPageContainer />} />
                <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
        </Box>
    );
};

export { AdminLayoutPage };
