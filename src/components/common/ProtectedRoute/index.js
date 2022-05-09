import { Navigate, Route } from 'react-router-dom';
import { connect } from 'react-redux';
export const ProtectedRoute = ({ roles = [], fallback = '/', component, auth, ...routeProps }) => {
    const WrapperComponent = (renderProps) => {
        const C = component;
        !!auth.length || (auth = ['anon']);
        if (!auth.filter((role) => roles.includes(role)).length) {
            return <Navigate to={fallback} />;
        }
        return <C {...renderProps} />;
    };
    return <Route {...routeProps} element={<WrapperComponent />} />;
};

export const CProtectedRoute = connect((state) => ({ auth: state.auth?.payload?.sub?.acl || [] }))(ProtectedRoute);
