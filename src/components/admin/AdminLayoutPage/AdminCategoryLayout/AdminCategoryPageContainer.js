import { connect } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { actionAdminCategoryPage } from "../../../../actions/actionAdminCategoryPage";
import { actionAdminCategoryPageClear } from "../../../../actions/actionAdminCategoryPageClear";
import { CAdminCategoryPage } from "../../AdminCategoryPage";

const AdminCategoryPageContainer = ({ onUnmount, onLoad }) => {
    const params = useParams();

    useEffect(() => {
        onLoad(params._id);
        return () => {
            onUnmount();
        };
    }, []);

    return <CAdminCategoryPage />;
};

export const CAdminCategoryPageContainer = connect(null, {
    onUnmount: () => actionAdminCategoryPageClear(),
    onLoad: (_id) => actionAdminCategoryPage({ _id }),
})(AdminCategoryPageContainer);
