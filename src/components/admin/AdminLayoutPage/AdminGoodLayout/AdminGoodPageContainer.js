import { CAdminGoodPage } from "../../AdminGoodPage";
import { actionAdminGoodPage } from "../../../../actions/actionAdminGoodPage";
import { actionAdminGoodPageClear } from "../../../../actions/actionAdminGoodPageClear";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";

const AdminGoodPageContainer = ({ onUnmount, onLoad }) => {
    const params = useParams();

    useEffect(() => {
        onLoad(params._id);
        return () => {
            onUnmount();
        };
    }, []);

    return <CAdminGoodPage />;
};

export const CAdminGoodPageContainer = connect(null, {
    onUnmount: () => actionAdminGoodPageClear(),
    onLoad: (_id) => actionAdminGoodPage({ _id }),
})(AdminGoodPageContainer);
