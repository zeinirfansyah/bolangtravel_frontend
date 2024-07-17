import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

export const ProtectedRoute = ({ role }) => {
  const { isAuthenticated, user } = useAuthStore((state) => state);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/not-found" replace />;
  }

  return <Outlet />;
};
