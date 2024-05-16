import React from "react";
import { Outlet } from "react-router-dom";
import InstSidebar from "./InstSidebar";
import InstHeader from "./InstHeader";
import { Toaster } from "react-hot-toast";

const InstLayout: React.FC = () => {
  return (
    <div className="flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden">
      <InstSidebar />
      <div className="flex-1 flex flex-col">
        <InstHeader />
        <div className="p-4 flex-1 overflow-y-auto">
          <Outlet />
          <Toaster />
        </div>
      </div>
    </div>
  );
};

export default InstLayout;
