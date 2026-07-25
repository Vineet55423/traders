import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  HomeSkeleton,
  CourseSkeleton,
  DashboardSkeleton,
} from "./components/ui/Skeletons";

const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const Consultation = React.lazy(() => import("./pages/Consultation"));
const FreeTrial = React.lazy(() => import("./pages/FreeTrial"));
const Course = React.lazy(() => import("./pages/Course"));
const Checkout = React.lazy(() => import("./pages/Checkout"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const ResetPassword = React.lazy(() => import("./pages/ResetPassword"));
const AuthCallback = React.lazy(() => import("./pages/AuthCallback"));
import { Toaster } from "react-hot-toast";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
      <Suspense fallback={null}>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <Suspense fallback={<HomeSkeleton />}>
                <Home />
              </Suspense>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/free-trial" element={<FreeTrial />} />
          {/* Protected Route */}
          <Route
            path="/course"
            element={
              <ProtectedRoute>
                <Suspense fallback={<CourseSkeleton />}>
                  <Course />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout/:courseId"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute adminOnly={true}>
                <Suspense fallback={<DashboardSkeleton />}>
                  <Dashboard />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
