import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

import LoginPage from "../pages/LoginPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import AdminDashboard from "../pages/AdminDashboard";
import AmbassadorListPage from "../pages/AmbassadorListPage";
import BulkOnboardPage from "../pages/BulkOnboardPage";
import TaskManagementPage from "../pages/TaskManagementPage";
import ProfilePage from "../pages/ProfilePage";
import ComplaintsPage from "../pages/ComplaintsPage";
import AnnouncementsPage from "../pages/AnnouncementsPage";
import TaskSubmissionsPage from "../pages/TaskSubmissionsPage";
import Layout from "../components/Layout";

// Placeholder components
const Unauthorized = () => <div className="p-8 text-center text-red-500"><h2 className="text-2xl font-bold">Unauthorized Access</h2><p className="mt-2">You don't have permission to view this page.</p></div>;

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Protected Routes - Admin Only */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        
        <Route element={<Layout children={<Outlet />} />}>
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/ambassadors" element={<AmbassadorListPage />} />
          <Route path="/ambassadors/bulk" element={<BulkOnboardPage />} />
          <Route path="/tasks" element={<TaskManagementPage />} />
          <Route path="/tasks/:id/submissions" element={<TaskSubmissionsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/complaints" element={<ComplaintsPage />} />
          <Route path="/announcements" element={<AnnouncementsPage />} />
        </Route>
      </Route>

      {/* Catch-all */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
