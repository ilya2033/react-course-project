import { connect } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { actionAdminCategoriesSearchPage } from "../../../../actions/actionAdminCategoriesSearchPage";
import { actionAdminCategoriesSearchPageClear } from "../../../../actions/actionAdminCategoriesSearchPageClear";
import { actionFeedAdd, actionFeedCatsFind } from "../../../../reducers";
import { AdminCategoriesPage } from "../../AdminCategoriesPage";

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

export const CAdminCategoriesSearchPageContainer = connect(
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
