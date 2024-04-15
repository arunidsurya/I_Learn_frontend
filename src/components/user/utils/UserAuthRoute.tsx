import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectiveRouteProps {
  children: ReactNode;
}

const UserAuthRoute: React.FC<ProtectiveRouteProps> = ({ children }) => {
  const userAuth = localStorage.getItem("accessToken");
  if (!userAuth) {
    return <Navigate to={"/login"} />;
  }
  return <>{children}</>;
};

export default UserAuthRoute;
