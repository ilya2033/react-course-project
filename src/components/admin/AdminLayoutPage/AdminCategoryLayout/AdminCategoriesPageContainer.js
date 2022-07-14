import { connect } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { actionCategoriesPage } from "../../../../actions/actionCategoriesPage";
import { actionCategoriesPageClear } from "../../../../actions/actionCategoriesPageClear";
import { actionFeedAdd, actionFeedCats } from "../../../../reducers";
import { AdminCategoriesPage } from "../../AdminCategoriesPage";

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

export const CAdminCategoriesPageContainer = connect(
    (state) => ({
        cats: state.promise?.feedCatAll?.payload || [],
        feed: state.feed?.payload || [],
        promiseStatus: state.promise?.feedCatAll?.status || null,
    }),
    {
        onUnmount: () => actionCategoriesPageClear(),
        onLoad: ({ orderBy }) => actionCategoriesPage({ orderBy }),
        onScroll: ({ feed, orderBy }) => actionFeedCats({ skip: feed?.length || 0, orderBy }),
    }
)(AdminCategoriesPageContainer);
