import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
    const { user, loading } = useAuth();

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">Loading...</div>;

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
