import { connect } from "react-redux";
import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { actionCatByIdFull } from "../../actions/actionCatByIdFull";
import { actionFeedCategoryGoods } from "../../reducers/feedReducer";
import { InfScroll } from "../common/InfScroll";
import { CGoodsPage } from "../GoodsPage";

const GoodsPageContainer = ({ feed, goods, promiseStatus, onLoad, onUnmount, onScroll, category }) => {
    const params = useParams();
    const [searchParams] = useSearchParams();
    const orderBy = searchParams.get("orderBy") || "_id";

    useEffect(() => {
        onLoad({ orderBy, _id: params._id });

        return () => {
            onUnmount && onUnmount();
        };
    }, [params._id, orderBy]);

    return (
        <InfScroll
            items={goods}
            component={CGoodsPage}
            promiseStatus={promiseStatus}
            onScroll={() => onScroll({ feed, orderBy, category })}
            orderBy={orderBy}
        />
    );
};

export const CAdminGoodsPageContainer = connect(
    (state) => ({
        goods: state.promise?.feedCategoryGoods?.payload || [],
        feed: state.feed?.payload || [],
        category: state.promise?.catById?.payload || null,
        promiseStatus: state.promise?.feedCategoryGoods?.status || null,
    }),
    {
        onUnmount: () => ({ type: "CAT_BY_ID_FULL_CLEAR" }),
        onLoad: ({ orderBy, _id }) => actionCatByIdFull({ orderBy, _id }),
        onScroll: ({ feed, orderBy, category }) => actionFeedCategoryGoods({ skip: feed.length || 0, orderBy, category }),
    }
)(GoodsPageContainer);
