import React from "react";
import { FcBullish } from "react-icons/fc";
import {
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
  DASHBOARD_SIDEBAR_LINKS,
} from "../lib/sidebarContent";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import { HiOutlineLogout } from "react-icons/hi";
import { GiTeacher } from "react-icons/gi";

interface SidebarItem {
  key: string;
  path: string;
  icon: JSX.Element;
  label: string;
}

const linkClasses =
  "flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base";

const InstSidebar: React.FC = () => {
  return (
    <div className="flex flex-col bg-blue-950 w-60 p-3 text-white">
      <div className="flex items-center gap-2 px-1 py-3 text-xl">
        <FcBullish />
        <span className="text-neutral-100 text-2xl font-bold">E-Learning</span>
      </div>

      <div className="flex gap-2 items-center mt-5 ml-2">
        <GiTeacher />
        <span>
          <h1 className="text-xl font-bold">Instructor</h1>
        </span>
      </div>

      <div className="flex-1 py-8 flex flex-col gap-0.5">
        {DASHBOARD_SIDEBAR_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
      </div>
      <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
        <div className={classNames("text-red-500 cursor-pointer", linkClasses)}>
          <span>
            <HiOutlineLogout />
          </span>
          Logout
        </div>
      </div>
    </div>
  );
};

export default InstSidebar;

function SidebarLink({ item }: { item: SidebarItem }) {
  const { pathname } = useLocation();

  return (
    <Link
      to={item.path}
      className={classNames(
        pathname === item.path ? "bg-neutral-700 text-white" : "text-white",
        linkClasses
      )}
    >
      <span className="text-xl">{item.icon}</span>
      {item.label}
    </Link>
  );
}
