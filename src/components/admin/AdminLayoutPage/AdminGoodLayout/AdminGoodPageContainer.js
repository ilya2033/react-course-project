import { CAdminGoodPage } from "../../AdminGoodPage";
import { actionGoodPage } from "../../../../actions/actionGoodPage";
import { actionGoodPageClear } from "../../../../actions/actionGoodPageClear";
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
    onUnmount: () => actionGoodPageClear({ promiseName: "adminGoodById" }),
    onLoad: (_id) => actionGoodPage({ _id, promiseName: "adminGoodById" }),
})(AdminGoodPageContainer);
