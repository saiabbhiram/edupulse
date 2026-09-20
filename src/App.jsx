import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';

import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Teachers from './pages/Teachers';
import Parents from './pages/Parents';
import Classes from './pages/Classes';
import Subjects from './pages/Subjects';
import Attendance from './pages/Attendance';
import Timetable from './pages/Timetable';
import Exams from './pages/Exams';
import Results from './pages/Results';
import Assignments from './pages/Assignments';
import Fees from './pages/Fees';
import Library from './pages/Library';
import Notices from './pages/Notices';
import Events from './pages/Events';
import Messages from './pages/Messages';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

// Route Guard component
const ProtectedRoute = ({ children, feature }) => {
  const { isAuthenticated, canAccess } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (feature && !canAccess(feature)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="students" element={<ProtectedRoute feature="students"><Students /></ProtectedRoute>} />
        <Route path="teachers" element={<ProtectedRoute feature="teachers"><Teachers /></ProtectedRoute>} />
        <Route path="parents" element={<ProtectedRoute feature="parents"><Parents /></ProtectedRoute>} />
        <Route path="classes" element={<ProtectedRoute feature="classes"><Classes /></ProtectedRoute>} />
        <Route path="subjects" element={<ProtectedRoute feature="subjects"><Subjects /></ProtectedRoute>} />
        <Route path="attendance" element={<ProtectedRoute feature="attendance"><Attendance /></ProtectedRoute>} />
        <Route path="timetable" element={<ProtectedRoute feature="timetable"><Timetable /></ProtectedRoute>} />
        <Route path="exams" element={<ProtectedRoute feature="exams"><Exams /></ProtectedRoute>} />
        <Route path="results" element={<ProtectedRoute feature="results"><Results /></ProtectedRoute>} />
        <Route path="assignments" element={<ProtectedRoute feature="assignments"><Assignments /></ProtectedRoute>} />
        <Route path="fees" element={<ProtectedRoute feature="fees"><Fees /></ProtectedRoute>} />
        <Route path="library" element={<ProtectedRoute feature="library"><Library /></ProtectedRoute>} />
        <Route path="notices" element={<ProtectedRoute feature="notices"><Notices /></ProtectedRoute>} />
        <Route path="events" element={<ProtectedRoute feature="events"><Events /></ProtectedRoute>} />
        <Route path="messages" element={<ProtectedRoute feature="messages"><Messages /></ProtectedRoute>} />
        <Route path="reports" element={<ProtectedRoute feature="reports"><Reports /></ProtectedRoute>} />
        <Route path="settings" element={<ProtectedRoute feature="settings"><Settings /></ProtectedRoute>} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            <AppRoutes />
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
