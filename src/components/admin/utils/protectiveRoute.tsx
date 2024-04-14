import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectiveRouteProps {
  children: ReactNode;
}

const ProtectiveRoute: React.FC<ProtectiveRouteProps> = ({ children }) => {
  const adminAuth = localStorage.getItem("admin_accessToken");
  if (!adminAuth) {
    return <Navigate to={"/admin_login"} />;
  }
  return <>{children}</>;
};

export default ProtectiveRoute;
