import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";

const UserLayout: React.FC = () => {

  return (
    <div className="flex flex-col min-h-screen bg-neutral-100  ">
      <Header />
      <div className="flex-grow">{<Outlet />}</div>
      <Footer />
      <Toaster />
    </div>
  );
};

export default UserLayout;
