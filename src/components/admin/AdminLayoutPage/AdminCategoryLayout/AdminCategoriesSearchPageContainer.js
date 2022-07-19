import { connect } from "react-redux";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { actionCategoriesSearchPage } from "../../../../actions/actionCategoriesSearchPage";
import { actionFeedCatsFind } from "../../../../reducers";
import { AdminCategoriesPage } from "../../AdminCategoriesPage";
import { InfScroll } from "../../../common/InfScroll";

const AdminCategoriesSearchPageContainer = ({ feed, cats, promiseStatus, onLoad, onUnmount, onScroll }) => {
    const [searchParams] = useSearchParams();
    const orderBy = searchParams.get("orderBy") || "_id";
    const text = searchParams.get("text") || "";

    useEffect(() => {
        onLoad({ orderBy, text });
        return () => {
            onUnmount();
        };
    }, [orderBy, text]);

    return (
        <InfScroll
            items={cats}
            component={AdminCategoriesPage}
            promiseStatus={promiseStatus}
            onScroll={() => onScroll({ feed, orderBy, text })}
            orderBy={orderBy}
        />
    );
};

export const CAdminCategoriesSearchPageContainer = connect(
    (state) => ({
        cats: state.promise?.feedCatsFind?.payload || [],
        feed: state.feed?.payload || [],
        promiseStatus: state.promise?.feedCatsFind?.status || null,
    }),
    {
        onUnmount: () => ({ type: "CATEGORIES_SEARCH_PAGE_CLEAR" }),
        onLoad: ({ orderBy, text }) => actionCategoriesSearchPage({ orderBy, text }),
        onScroll: ({ feed, orderBy, text }) => actionFeedCatsFind({ text, skip: feed?.length || 0, orderBy }),
    }
)(AdminCategoriesSearchPageContainer);
