import { connect } from "react-redux";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { actionUsersSearchPage } from "../../../../actions/actionUsersSearchPage";
import { actionUsersSearchPageClear } from "../../../../actions/actionUsersSearchPageClear";
import { actionFeedUsersFind } from "../../../../reducers";
import { InfScroll } from "../../../common/InfScroll";
import { AdminUsersPage } from "../../AdminUsersPage";

const AdminUsersSearchPageContainer = ({ feed, users, promiseStatus, onLoad, onUnmount, onScroll }) => {
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
            items={users}
            component={AdminUsersPage}
            promiseStatus={promiseStatus}
            onScroll={() => onScroll({ feed, orderBy, text })}
            orderBy={orderBy}
        />
    );
};

export const CAdminUsersSearchPageContainer = connect(
    (state) => ({
        users: state.promise?.feedUsersFind?.payload || [],
        feed: state.feed?.payload || [],
        promiseStatus: state.promise?.feedUsersFind?.status || null,
    }),
    {
        onUnmount: () => actionUsersSearchPageClear(),
        onLoad: ({ orderBy, text }) => actionUsersSearchPage({ orderBy, text }),
        onScroll: ({ feed, orderBy, text }) => actionFeedUsersFind({ text, skip: feed?.length || 0, orderBy }),
    }
)(AdminUsersSearchPageContainer);
