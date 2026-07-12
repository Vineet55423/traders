import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

import { useAuth } from "../context/AuthContext";
import { isAdmin } from "../lib/admin";

type ProtectedRouteProps = {
  children: ReactNode;
  adminOnly?: boolean;
};

export default function ProtectedRoute({
  children,
  adminOnly = false,
}: ProtectedRouteProps) {
  const { session, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin(session.user.email)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}