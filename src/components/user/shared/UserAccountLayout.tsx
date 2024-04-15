import React from "react";
import AccountSidebar from "../userAccount/AccountSidebar";
import { Outlet } from "react-router-dom";

const UserAccountLayout: React.FC = () => {
  return (
    <div className="flex flex-row bg-neutral-100 h-full w-screen overflow-hidden">
      <AccountSidebar />
      <div className="flex-1">
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserAccountLayout;
