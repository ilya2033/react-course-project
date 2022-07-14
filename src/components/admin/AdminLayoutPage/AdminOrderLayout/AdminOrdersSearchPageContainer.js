import { connect } from "react-redux";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { actionAdminOrdersSearchPageClear } from "../../../../actions/actionAdminOrdersSearchPageClear";
import { actionFeedOrdersFind } from "../../../../reducers";
import { InfScroll } from "../../../common/InfScroll";
import { AdminOrdersPage } from "../../AdminOrdersPage";

const AdminOrdersSearchPageContainer = ({ feed, orders, promiseStatus, onLoad, onUnmount, onScroll }) => {
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

    return (
        <InfScroll
            items={orders}
            component={AdminOrdersPage}
            promiseStatus={promiseStatus}
            onScroll={() => onScroll({ feed, orderBy })}
            orderBy={orderBy}
        />
    );
};

export const CAdminOrdersSearchPageContainer = connect(
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
