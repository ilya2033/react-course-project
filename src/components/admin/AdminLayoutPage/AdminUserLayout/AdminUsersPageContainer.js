import { connect } from "react-redux";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { actionUsersPage } from "../../../../actions/actionUsersPage";
import { actionUsersPageClear } from "../../../../actions/actionUsersPageClear";
import { actionFeedUsers } from "../../../../reducers";
import { InfScroll } from "../../../common/InfScroll";
import { AdminUsersPage } from "../../AdminUsersPage";

const AdminUsersPageContainer = ({ feed, users, promiseStatus, onLoad, onUnmount, onScroll }) => {
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
            items={users}
            component={AdminUsersPage}
            promiseStatus={promiseStatus}
            onScroll={() => onScroll({ feed, orderBy })}
            orderBy={orderBy}
        />
    );
};

export const CAdminUsersPageContainer = connect(
    (state) => ({
        users: state.promise?.feedUsersAll?.payload || [],
        feed: state.feed?.payload || [],
        promiseStatus: state.promise?.feedUsersAll?.status || null,
    }),
    {
        onUnmount: () => actionUsersPageClear(),
        onLoad: ({ orderBy }) => actionUsersPage({ orderBy }),
        onScroll: ({ feed, orderBy }) => actionFeedUsers({ skip: feed?.length || 0, orderBy }),
    }
)(AdminUsersPageContainer);
