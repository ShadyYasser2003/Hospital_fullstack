import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Navigation } from './components/Navigation';
import { FooterNav } from './components/FooterNav';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { DepartmentsPage } from './pages/DepartmentsPage';
import { DepartmentDetailPage } from './pages/DepartmentDetailPage';
import { DoctorsPage } from './pages/DoctorsPage';
import { AppointmentPage } from './pages/AppointmentPage';
import { ContactPage } from './pages/ContactPage';
import { PatientManagementPage } from './pages/PatientManagementPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { UserPortalPage } from './pages/UserPortalPage';
import { AppointmentReceiptPage } from './pages/AppointmentReceiptPage';
import { Toaster } from './components/ui/sonner';
import { setupInitialData } from './utils/initializeData';

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  useEffect(() => {
    setupInitialData();
  }, []);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={
        <div className="min-h-screen bg-white">
          <Navigation />
          <main><HomePage /></main>
          <FooterNav />
        </div>
      } />
      <Route path="/services" element={
        <div className="min-h-screen bg-white">
          <Navigation />
          <main><ServicesPage /></main>
          <FooterNav />
        </div>
      } />
      <Route path="/departments" element={
        <div className="min-h-screen bg-white">
          <Navigation />
          <main><DepartmentsPage /></main>
          <FooterNav />
        </div>
      } />
      <Route path="/departments/:departmentId" element={
        <div className="min-h-screen bg-white">
          <Navigation />
          <main><DepartmentDetailPage /></main>
          <FooterNav />
        </div>
      } />
      <Route path="/doctors" element={
        <div className="min-h-screen bg-white">
          <Navigation />
          <main><DoctorsPage /></main>
          <FooterNav />
        </div>
      } />
      <Route path="/appointment" element={
        <div className="min-h-screen bg-white">
          <Navigation />
          <main><AppointmentPage /></main>
          <FooterNav />
        </div>
      } />
      <Route path="/contact" element={
        <div className="min-h-screen bg-white">
          <Navigation />
          <main><ContactPage /></main>
          <FooterNav />
        </div>
      } />
      <Route path="/patients" element={
        <div className="min-h-screen bg-white">
          <Navigation />
          <main><PatientManagementPage /></main>
          <FooterNav />
        </div>
      } />

      {/* User Portal Routes */}
      <Route path="/user-portal" element={<UserPortalPage />} />
      <Route path="/appointment-receipt/:id" element={<AppointmentReceiptPage />} />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin/dashboard" element={
        <ProtectedRoute>
          <AdminDashboardPage />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
        <Toaster />
      </AuthProvider>
    </Router>
  );
}
