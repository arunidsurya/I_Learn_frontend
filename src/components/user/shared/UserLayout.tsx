import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const UserLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-100  ">
      <Header />
      <div className="flex-grow">{<Outlet />}</div>
      <Footer />
    </div>
  );
};

export default UserLayout;
