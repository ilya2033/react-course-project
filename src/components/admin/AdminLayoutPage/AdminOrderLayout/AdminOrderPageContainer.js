import { connect } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { actionOrderPage } from "../../../../actions/actionOrderPage";
import { actionOrderPageClear } from "../../../../actions/actionOrderPageClear";
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
    onUnmount: () => actionOrderPageClear({ promiseName: "adminOrderById" }),
    onLoad: (_id) => actionOrderPage({ _id, promiseName: "adminOrderById" }),
})(AdminOrderPageContainer);
