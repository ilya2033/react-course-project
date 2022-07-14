import { connect } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { actionCategoryPage } from "../../../../actions/actionCategoryPage";
import { actionCategoryPageClear } from "../../../../actions/actionCategoryPageClear";
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
    onUnmount: () => actionCategoryPageClear({ promiseName: "adminCatById" }),
    onLoad: (_id) => actionCategoryPage({ _id, promiseName: "adminCatById" }),
})(AdminCategoryPageContainer);
