import { actionGoodsPage } from "../../../../actions/actionGoodsPage";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { InfScroll } from "../../../common/InfScroll";
import { AdminGoodsPage } from "../../AdminGoodsPage";
import { connect } from "react-redux";
import { actionFeedGoods } from "../../../../reducers";

const AdminGoodsPageContainer = ({ feed, goods, promiseStatus, onLoad, onUnmount, onScroll }) => {
    const [searchParams] = useSearchParams();
    const orderBy = searchParams.get("orderBy") || "_id";

    useEffect(() => {
        onLoad({ orderBy });

        return () => {
            onUnmount && onUnmount();
        };
    }, [orderBy]);

    return (
        <InfScroll
            items={goods}
            component={AdminGoodsPage}
            promiseStatus={promiseStatus}
            onScroll={() => onScroll({ feed, orderBy })}
            orderBy={orderBy}
        />
    );
};

export const CAdminGoodsPageContainer = connect(
    (state) => ({
        goods: state.promise?.feedGoodsAll?.payload || [],
        feed: state.feed?.payload || [],
        promiseStatus: state.promise?.feedGoodsAll?.status || null,
    }),
    {
        onUnmount: () => ({ type: "GOODS_PAGE_CLEAR" }),
        onLoad: ({ orderBy }) => actionGoodsPage({ orderBy }),
        onScroll: ({ feed, orderBy }) => actionFeedGoods({ skip: feed?.length || 0, orderBy }),
    }
)(AdminGoodsPageContainer);
