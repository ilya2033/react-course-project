import { Box } from "@mui/material";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { actionPromiseClear } from "../../../reducers";
import { actionCatAll } from "../../../actions/actionCatAll";
import { CAdminCategoryTree } from "../AdminCategoryTree";
import { CAdminGoodPageContainer, CAdminGoodsPageContainer, CAdminGoodsSearchPageContainer } from "./AdminGoodLayout";
import { CAdminCategoriesPageContainer, CAdminCategoriesSearchPageContainer, CAdminCategoryPageContainer } from "./AdminCategoryLayout";
import { CAdminOrderPageContainer, CAdminOrdersPageContainer, CAdminOrdersSearchPageContainer } from "./AdminOrderLayout";
import { CAdminUserPageContainer, CAdminUsersPageContainer, CAdminUsersSearchPageContainer } from "./AdminUserLayout";

const AdminCategoryTreePageContainer = ({ onLoad, onUnmount }) => {
    useEffect(() => {
        onLoad();
        return () => {
            onUnmount();
        };
    }, []);

    return <CAdminCategoryTree />;
};

const CAdminCategoryTreePageContainer = connect(null, {
    onUnmount: () => actionPromiseClear("catAll"),
    onLoad: () => actionCatAll(),
})(AdminCategoryTreePageContainer);

const AdminLayoutPage = () => {
    return (
        <Box className="AdminLayoutPage">
            <Routes>
                <Route path="/" element={<Navigate to={"/admin/goods/"} />} />
                <Route path="/tree/" element={<CAdminCategoryTreePageContainer />} />
                <Route path="/goods/" element={<CAdminGoodsPageContainer />} />
                <Route path="/goods/search" element={<CAdminGoodsSearchPageContainer />} />
                <Route path="/good/" element={<CAdminGoodPageContainer />} />
                <Route path="/good/:_id" element={<CAdminGoodPageContainer />} />
                <Route path="/categories/" element={<CAdminCategoriesPageContainer />} />
                <Route path="/categories/search" element={<CAdminCategoriesSearchPageContainer />} />
                <Route path="/category/" element={<CAdminCategoryPageContainer />} />
                <Route path="/category/:_id" element={<CAdminCategoryPageContainer />} />
                <Route path="/orders/" element={<CAdminOrdersPageContainer />} />
                <Route path="/orders/search" element={<CAdminOrdersSearchPageContainer />} />
                <Route path="/order/" element={<CAdminOrderPageContainer />} />
                <Route path="/order/:_id" element={<CAdminOrderPageContainer />} />
                <Route path="/users/search" element={<CAdminUsersSearchPageContainer />} />
                <Route path="/users/" element={<CAdminUsersPageContainer />} />
                <Route path="/user/" element={<CAdminUserPageContainer />} />
                <Route path="/user/:_id" element={<CAdminUserPageContainer />} />
                <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
        </Box>
    );
};

export { AdminLayoutPage };
