import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface InstAuthRouteProps {
  children: ReactNode;
}

const InstAuthRoute: React.FC<InstAuthRouteProps> = ({ children }) => {
  const tutorAuth = localStorage.getItem("tutor_accessToken");
  console.log(tutorAuth);

  if (!tutorAuth) {
    return <Navigate to={"/inst_login"} />;
  }
  return <>{children}</>;
};

export default InstAuthRoute;
