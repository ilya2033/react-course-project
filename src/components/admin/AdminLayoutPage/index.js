import { Box } from "@mui/material";
import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Navigate, Route, Routes, useParams, useSearchParams } from "react-router-dom";
import { actionPromiseClear, actionFeedCats, actionFeedGoodsFind, actionFeedOrdersFind, actionFeedCatsFind } from "../../../reducers";
import { actionFeedAdd, actionFeedGoods, actionFeedOrders, actionFeedUsers, actionFeedUsersFind } from "../../../reducers/feedReducer";
import { CAdminGoodPage } from "../AdminGoodPage";
import { AdminGoodsPage } from "../AdminGoodsPage";
import { AdminCategoriesPage } from "../AdminCategoriesPage";
import { CAdminCategoryPage } from "../AdminCategoryPage";
import { AdminOrdersPage } from "../AdminOrdersPage";
import { CAdminOrderPage } from "../AdminOrderPage";
import { actionCatAll } from "../../../actions/actionCatAll";
import { CAdminCategoryTree } from "../AdminCategoryTree";
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
import { actionAdminGoodsSearchPageClear } from "../../../actions/actionAdminGoodsSearchPageClear";
import { actionAdminGoodsSearchPage } from "../../../actions/actionAdminGoodsSearchPage";
import { actionAdminOrdersPageClear } from "../../../actions/actionAdminOrdersPageClear";
import { actionAdminOrdersPage } from "../../../actions/actionAdminOrdersPage";
import { actionAdminOrdersSearchPageClear } from "../../../actions/actionAdminOrdersSearchPageClear";
import { actionAdminOrderPage } from "../../../actions/actionAdminOrderPage";
import { actionAdminOrderPageClear } from "../../../actions/actionAdminOrderPageClear";
import { actionAdminUsersSearchPageClear } from "../../../actions/actionAdminUsersSearchPageClear";
import { actionAdminUsersSearchPage } from "../../../actions/actionAdminUsersSearchPage";
import { actionAdminUsersPageClear } from "../../../actions/actionAdminUsersPageClear";
import { actionAdminUsersPage } from "../../../actions/actionAdminUsersPage";
import { actionAdminUserPageClear } from "../../../actions/actionAdminUserPageClear";
import { actionAdminUserPage } from "../../../actions/actionAdminUserPage";

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

const AdminGoodsSearchPageContainer = ({ feed, goods, promiseStatus, onLoad, onUnmount, onScroll }) => {
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
        if (goods?.length) dispatch(actionFeedAdd(goods));
    }, [goods]);
    return <AdminGoodsPage orderBy={orderBy} />;
};

const CAdminGoodsSearchPageContainer = connect(
    (state) => ({
        goods: state.promise?.feedGoodsFind?.payload || [],
        feed: state.feed?.payload || [],
        promiseStatus: state.promise?.feedGoodsFind?.status || null,
    }),
    {
        onUnmount: () => actionAdminGoodsSearchPageClear(),
        onLoad: ({ orderBy, text }) => actionAdminGoodsSearchPage({ orderBy, text }),
        onScroll: ({ feed, orderBy, text }) => actionFeedGoodsFind({ text, skip: feed?.length || 0, orderBy }),
    }
)(AdminGoodsSearchPageContainer);

const AdminOrdersPageContainer = ({ feed, orders, promiseStatus, onLoad, onUnmount, onScroll }) => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const orderBy = searchParams.get("orderBy") || "_id";
    const status = searchParams.get("status") || 0;

    useEffect(() => {
        onLoad({ orderBy, status });
        return () => {
            onUnmount();
        };
    }, [orderBy, status]);

    useEffect(() => {
        window.onscroll = (e) => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
                if (promiseStatus !== "PENDING") {
                    onScroll({ feed, orderBy, status });
                }
            }
        };
        return () => {
            window.onscroll = null;
        };
    }, [promiseStatus, feed, status]);

    useEffect(() => {
        if (orders?.length) dispatch(actionFeedAdd(orders));
    }, [orders]);

    return <AdminOrdersPage orderBy={orderBy} />;
};

const CAdminOrdersPageContainer = connect(
    (state) => ({
        orders: state.promise?.feedOrdersAll?.payload || [],
        feed: state.feed?.payload || [],
        promiseStatus: state.promise?.feedOrdersAll?.status || null,
    }),
    {
        onUnmount: () => actionAdminOrdersPageClear(),
        onLoad: ({ orderBy, status }) => actionAdminOrdersPage({ orderBy, status }),
        onScroll: ({ feed, orderBy, status }) => actionFeedOrders({ skip: feed?.length || 0, orderBy, status }),
    }
)(AdminOrdersPageContainer);

const AdminOrdersSearchPageContainer = ({ feed, orders, promiseStatus, onLoad, onUnmount, onScroll }) => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const orderBy = searchParams.get("orderBy") || "_id";
    const text = searchParams.get("text") || "";
    const status = searchParams.get("status") || 0;

    useEffect(() => {
        onLoad({ orderBy, text });
        return () => {
            onUnmount();
        };
    }, [orderBy, text, status]);

    useEffect(() => {
        window.onscroll = (e) => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
                if (promiseStatus !== "PENDING") {
                    onScroll({ feed, orderBy, text, status });
                }
            }
        };
        return () => {
            window.onscroll = null;
        };
    }, [promiseStatus, feed, text, status]);

    useEffect(() => {
        if (orders?.length) dispatch(actionFeedAdd(orders));
    }, [orders]);

    return <AdminOrdersPage orderBy={orderBy} />;
};

const CAdminOrdersSearchPageContainer = connect(
    (state) => ({
        orders: state.promise?.feedOrdersFind?.payload || [],
        feed: state.feed?.payload || [],
        promiseStatus: state.promise?.feedOrdersFind?.status || null,
    }),
    {
        onUnmount: () => actionAdminOrdersSearchPageClear(),
        onLoad: ({ orderBy, text, status }) => actionAdminOrdersSearchPageClear({ orderBy, text, status }),
        onScroll: ({ feed, orderBy, text, status }) => actionFeedOrdersFind({ text, skip: feed?.length || 0, orderBy, status }),
    }
)(AdminOrdersSearchPageContainer);

const AdminOrderPageContainer = ({ onLoad, onUnmount }) => {
    const params = useParams();

    useEffect(() => {
        return () => {
            onUnmount();
        };
    }, []);

    useEffect(() => {
        onLoad(params._id);
    }, [params._id]);
    return <CAdminOrderPage />;
};

const CAdminOrderPageContainer = connect(null, {
    onUnmount: () => actionAdminOrderPageClear(),
    onLoad: (_id) => actionAdminOrderPage({ _id }),
})(AdminOrderPageContainer);

const AdminUsersSearchPageContainer = ({ feed, users, promiseStatus, onLoad, onUnmount, onScroll }) => {
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
        if (users?.length) dispatch(actionFeedAdd(users));
    }, [users]);

    return <AdminUsersPage orderBy={orderBy} />;
};

const CAdminUsersSearchPageContainer = connect(
    (state) => ({
        users: state.promise?.feedUsersFind?.payload || [],
        feed: state.feed?.payload || [],
        promiseStatus: state.promise?.feedUsersFind?.status || null,
    }),
    {
        onUnmount: () => actionAdminUsersSearchPageClear(),
        onLoad: ({ orderBy, text }) => actionAdminUsersSearchPage({ orderBy, text }),
        onScroll: ({ feed, orderBy, text }) => actionFeedUsersFind({ text, skip: feed?.length || 0, orderBy }),
    }
)(AdminUsersSearchPageContainer);

const AdminUsersPageContainer = ({ feed, users, promiseStatus, onLoad, onUnmount, onScroll }) => {
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
        if (users?.length) dispatch(actionFeedAdd(users));
    }, [users]);
    return <AdminUsersPage orderBy={orderBy} />;
};

const CAdminUsersPageContainer = connect(
    (state) => ({
        users: state.promise?.feedUsersAll?.payload || [],
        feed: state.feed?.payload || [],
        promiseStatus: state.promise?.feedUsersAll?.status || null,
    }),
    {
        onUnmount: () => actionAdminUsersPageClear(),
        onLoad: ({ orderBy }) => actionAdminUsersPage({ orderBy }),
        onScroll: ({ feed, orderBy }) => actionFeedUsers({ skip: feed?.length || 0, orderBy }),
    }
)(AdminUsersPageContainer);

const AdminUserPageContainer = ({ onLoad, onUnmount }) => {
    const params = useParams();

    useEffect(() => {
        return () => {
            onUnmount();
        };
    }, []);

    useEffect(() => {
        onLoad(params._id);
    }, [params._id]);
    return <CAdminUserPage />;
};

const CAdminUserPageContainer = connect(null, {
    onUnmount: () => actionAdminUserPageClear(),
    onLoad: (_id) => actionAdminUserPage({ _id }),
})(AdminUserPageContainer);

const AdminLayoutPage = () => {
    return (
        <Box className="AdminLayoutPage">
            <Routes>
                <Route path="/" element={<Navigate to={"/admin/goods/"} />} />
                <Route path="/tree/" element={<CAdminCategoryTreePageContainer />} />
                <Route path="/goods/" element={<CAdminGoodsPageContainer />} />
                <Route path="/goods/search" element={<CAdminGoodsSearchPageContainer />} />
                <Route path="/good/" element={<CAdminGoodPageContainer />} />
                <Route path="/good/:_id" element={<CAdminGoodPageContainer />} />
                <Route path="/categories/" element={<CAdminCategoriesPageContainer />} />
                <Route path="/categories/search" element={<CAdminCategoriesSearchPageContainer />} />
                <Route path="/category/" element={<CAdminCategoryPageContainer />} />
                <Route path="/category/:_id" element={<CAdminCategoryPageContainer />} />
                <Route path="/orders/" element={<CAdminOrdersPageContainer />} />
                <Route path="/orders/search" element={<CAdminOrdersSearchPageContainer />} />
                <Route path="/order/" element={<CAdminOrderPageContainer />} />
                <Route path="/order/:_id" element={<CAdminOrderPageContainer />} />
                <Route path="/users/search" element={<CAdminUsersSearchPageContainer />} />
                <Route path="/users/" element={<CAdminUsersPageContainer />} />
                <Route path="/user/" element={<CAdminUserPageContainer />} />
                <Route path="/user/:_id" element={<CAdminUserPageContainer />} />
                <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
        </Box>
    );
};

export { AdminLayoutPage };
