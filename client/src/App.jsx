import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ComponentDetail from './pages/ComponentDetail';
import Search from './pages/Search';
import Docs from './pages/Docs';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastContainer } from './components/NotificationToast';
import ProtectedRoute from './components/ProtectedRoute';

// Dashboards
import CompanyDashboard from './pages/company/CompanyDashboard';
import PublishPackage from './pages/company/PublishPackage';
import PublishVersion from './pages/company/PublishVersion';
import CompanyNotifications from './pages/company/CompanyNotifications';
import CompanySettings from './pages/company/CompanySettings';
import EmployeeDashboard from './pages/employee/EmployeeDashboard';
import EmployeeNotifications from './pages/employee/EmployeeNotifications';
import EmployeeSubscriptions from './pages/employee/EmployeeSubscriptions';
import ExplorePackages from './pages/employee/ExplorePackages';
import PackageDetails from './pages/employee/PackageDetails';

// Helper to redirect based on role
const DashboardRedirect = () => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  return <Navigate to={user.accountType === 'company' ? '/company/dashboard' : '/employee/dashboard'} />;
};

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-lionsmane text-midnight font-sans selection:bg-marigold/30">
        <Navbar />
        <div className="relative z-10">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/login" element={<div className="container mx-auto px-4 py-8"><Login /></div>} />
            <Route path="/signup" element={<div className="container mx-auto px-4 py-8"><Signup /></div>} />

            {/* Redirect /dashboard to specific role dashboard */}
            <Route path="/dashboard" element={<DashboardRedirect />} />

            {/* Protected Company Routes */}
            <Route element={<ProtectedRoute allowedRoles={['company']} />}>
              <Route path="/company/dashboard" element={<CompanyDashboard />} />
              <Route path="/company/dashboard/publish" element={<PublishPackage />} />
              <Route path="/company/dashboard/versions" element={<PublishVersion />} />
              <Route path="/company/dashboard/notifs" element={<CompanyNotifications />} />
              <Route path="/company/dashboard/settings" element={<CompanySettings />} />
            </Route>

            {/* Protected Employee Routes */}
            <Route element={<ProtectedRoute allowedRoles={['employee']} />}>
              <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
              <Route path="/employee/dashboard/notifications" element={<EmployeeNotifications />} />
              <Route path="/employee/dashboard/subscriptions" element={<EmployeeSubscriptions />} />
              {/* Reuse global search for Explore but mapped here if needed, or just let sidebar link to global search? 
                    Sidebar links to /employee/dashboard/explore. Let's redirect that to /search or map it. 
                    Better to map it to Search page but verify Layout? 
                    Actually, let's just use Search component inside DashboardLayout for better UX. */}
              <Route path="/employee/dashboard/explore" element={<ExplorePackages />} />
              <Route path="/packages/:id" element={<PackageDetails />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/search" element={<div className="container mx-auto px-4 py-8"><Search /></div>} />
              <Route path="/packages/:name" element={<div className="container mx-auto px-4 py-8"><ComponentDetail /></div>} />
            </Route>
          </Routes>
        </div>
        <ToastContainer />
      </div>
    </AuthProvider>
  );
}

export default App;
