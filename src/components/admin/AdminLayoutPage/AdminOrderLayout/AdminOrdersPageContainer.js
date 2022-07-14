import { connect } from "react-redux";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { actionAdminOrdersPage } from "../../../../actions/actionAdminOrdersPage";
import { actionAdminOrdersPageClear } from "../../../../actions/actionAdminOrdersPageClear";
import { actionFeedOrders } from "../../../../reducers";
import { InfScroll } from "../../../common/InfScroll";
import { AdminOrdersPage } from "../../AdminOrdersPage";

const AdminOrdersPageContainer = ({ feed, orders, promiseStatus, onLoad, onUnmount, onScroll }) => {
    const [searchParams] = useSearchParams();
    const orderBy = searchParams.get("orderBy") || "_id";
    const status = searchParams.get("status") || 0;

    useEffect(() => {
        onLoad({ orderBy, status });
        return () => {
            onUnmount();
        };
    }, [orderBy, status]);

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

export const CAdminOrdersPageContainer = connect(
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
