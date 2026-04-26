import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
    const { user, loading } = useAuth();

    useEffect(() => {
        if (loading && window.showLoader) {
            window.showLoader('Verifying credentials...');
        }
        if (!loading && window.hideLoader) {
            window.hideLoader();
        }
    }, [loading]);

    if (loading) return null; // loader overlay handles the visual

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.accountType)) {
        // Redirect to their appropriate dashboard if they try to access wrong one
        return <Navigate to={user.accountType === 'company' ? '/company/dashboard' : '/employee/dashboard'} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;

