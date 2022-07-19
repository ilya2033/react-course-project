import { connect } from "react-redux";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { actionCategoriesPage } from "../../../../actions/actionCategoriesPage";
import { actionFeedCats } from "../../../../reducers";
import { AdminCategoriesPage } from "../../AdminCategoriesPage";
import { InfScroll } from "../../../common/InfScroll";

const AdminCategoriesPageContainer = ({ feed, cats, promiseStatus, onLoad, onUnmount, onScroll }) => {
    const [searchParams] = useSearchParams();
    const orderBy = searchParams.get("orderBy") || "_id";

    useEffect(() => {
        onLoad({ orderBy });
        return () => {
            onUnmount();
        };
    }, [orderBy]);

    return (
        <InfScroll
            items={cats}
            component={AdminCategoriesPage}
            promiseStatus={promiseStatus}
            onScroll={() => onScroll({ feed, orderBy })}
            orderBy={orderBy}
        />
    );
};

export const CAdminCategoriesPageContainer = connect(
    (state) => ({
        cats: state.promise?.feedCatAll?.payload || [],
        feed: state.feed?.payload || [],
        promiseStatus: state.promise?.feedCatAll?.status || null,
    }),
    {
        onUnmount: () => ({ type: "CATEGORIES_PAGE_CLEAR" }),
        onLoad: ({ orderBy }) => actionCategoriesPage({ orderBy }),
        onScroll: ({ feed, orderBy }) => actionFeedCats({ skip: feed?.length || 0, orderBy }),
    }
)(AdminCategoriesPageContainer);
