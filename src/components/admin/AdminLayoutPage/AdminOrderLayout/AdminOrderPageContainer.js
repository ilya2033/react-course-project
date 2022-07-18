import { connect } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { actionOrderPage } from "../../../../actions/actionOrderPage";
import { CAdminOrderPage } from "../../AdminOrderPage";

const AdminOrderPageContainer = ({ onLoad, onUnmount }) => {
    const params = useParams();

    useEffect(() => {
        onLoad(params._id);
        return () => {
            onUnmount();
        };
    }, []);

    return <CAdminOrderPage />;
};

export const CAdminOrderPageContainer = connect(null, {
    onUnmount: () => ({ type: "ORDER_PAGE_CLEAR" }),
    onLoad: (_id) => actionOrderPage({ _id, promiseName: "adminOrderById" }),
})(AdminOrderPageContainer);
