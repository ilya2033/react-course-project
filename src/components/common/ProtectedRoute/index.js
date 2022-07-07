import { Navigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";

export const ProtectedRoute = ({ roles = ["anon"], children, fallback = "/", auth } = {}) => {
    let location = useLocation();
    !!auth.length || (auth = ["anon"]);
    if (!auth.filter((role) => roles.includes(role)).length) {
        return <Navigate to={fallback} state={{ from: location }} />;
    }

    return children;
};

export const CProtectedRoute = connect((state) => ({ auth: state.auth?.payload?.sub?.acl || [] }))(ProtectedRoute);
