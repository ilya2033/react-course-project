import { connect } from "react-redux";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { actionAdminGoodsSearchPage } from "../../../../actions/actionAdminGoodsSearchPage";
import { actionAdminGoodsSearchPageClear } from "../../../../actions/actionAdminGoodsSearchPageClear";
import { actionFeedGoodsFind } from "../../../../reducers";
import { InfScroll } from "../../../common/InfScroll";
import { AdminGoodsPage } from "../../AdminGoodsPage";

const AdminGoodsSearchPageContainer = ({ feed, goods, promiseStatus, onLoad, onUnmount, onScroll }) => {
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
            items={goods}
            component={AdminGoodsPage}
            promiseStatus={promiseStatus}
            onScroll={() => onScroll({ feed, orderBy, text })}
            orderBy={orderBy}
        />
    );
};

export const CAdminGoodsSearchPageContainer = connect(
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
