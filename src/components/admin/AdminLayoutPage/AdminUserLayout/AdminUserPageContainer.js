import { connect } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { actionAdminUserPage } from "../../../../actions/actionAdminUserPage";
import { actionAdminUserPageClear } from "../../../../actions/actionAdminUserPageClear";
import { CAdminUserPage } from "../../AdminUserPage.js";

const AdminUserPageContainer = ({ onLoad, onUnmount }) => {
    const params = useParams();

    useEffect(() => {
        return () => {
            onUnmount();
        };
    }, []);

    useEffect(() => {
        onLoad(params._id);
    }, [params._id]);
    return <CAdminUserPage />;
};

export const CAdminUserPageContainer = connect(null, {
    onUnmount: () => actionAdminUserPageClear(),
    onLoad: (_id) => actionAdminUserPage({ _id }),
})(AdminUserPageContainer);
