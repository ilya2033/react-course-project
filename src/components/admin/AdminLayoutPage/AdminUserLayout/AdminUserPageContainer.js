import { connect } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { actionUserPage } from "../../../../actions/actionUserPage";
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
    onUnmount: () => ({ type: "USER_PAGE_CLEAN" }),
    onLoad: (_id) => actionUserPage({ _id, promiseName: "adminUserById" }),
})(AdminUserPageContainer);
