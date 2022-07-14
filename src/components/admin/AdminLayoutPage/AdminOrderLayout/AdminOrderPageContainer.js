import { connect } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { actionAdminOrderPage } from "../../../../actions/actionAdminOrderPage";
import { actionAdminOrderPageClear } from "../../../../actions/actionAdminOrderPageClear";
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
    onUnmount: () => actionAdminOrderPageClear(),
    onLoad: (_id) => actionAdminOrderPage({ _id }),
})(AdminOrderPageContainer);
