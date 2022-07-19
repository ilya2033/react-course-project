import { CAdminGoodPage } from "../../AdminGoodPage";
import { actionGoodPage } from "../../../../actions/actionGoodPage";
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
    onUnmount: () => ({ type: "GOOD_PAGE_CLEAR" }),
    onLoad: (_id) => actionGoodPage({ _id, promiseName: "adminGoodById" }),
})(AdminGoodPageContainer);
