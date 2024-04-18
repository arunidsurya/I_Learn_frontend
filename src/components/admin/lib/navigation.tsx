import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { FaQuestionCircle, FaUsers } from "react-icons/fa";
import { FaRegCirclePlay } from "react-icons/fa6";
import { GoGraph } from "react-icons/go";
import { HiOutlineCog, HiOutlineQuestionMarkCircle } from "react-icons/hi";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { MdHomeFilled, MdOutlineAutoGraph } from "react-icons/md";
import { VscGraph } from "react-icons/vsc";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/admin",
    icon: <MdHomeFilled />,
  },
  {
    key: "users",
    label: "Users",
    path: "/admin/users",
    icon: <FaUsers />,
  },
  {
    key: "invoices",
    label: "Invoices",
    path: "/admin/invoices",
    icon: <LiaFileInvoiceSolid />,
  },
  {
    key: "liveCourses",
    label: "Live courses",
    path: "/admin/courses",
    icon: <FaRegCirclePlay />,
  },
  {
    key: "faq",
    label: "FAQ",
    path: "/admin/faq",
    icon: <FaQuestionCircle />,
  },
  {
    key: "categories",
    label: "Categories",
    path: "/admin/categories",
    icon: <BiCategory />,
  },
  {
    key: "manageTeam",
    label: "Manage Team",
    path: "/admin/manage_members",
    icon: <AiOutlineUsergroupAdd />,
  },
  {
    key: "courseAnalytics",
    label: "Course Analytics",
    path: "/admin/course_analytics",
    icon: <VscGraph />,
  },
  {
    key: "ordersAnalytics",
    label: "Orders Analytics",
    path: "/admin/orders_analytics",
    icon: <GoGraph />,
  },
  {
    key: "usersAnalytics",
    label: "Users Analytics",
    path: "/admin/users_analytics",
    icon: <MdOutlineAutoGraph />,
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: "settings",
    label: "Settings",
    path: "/admin/Settings",
    icon: <HiOutlineCog />,
  },
  {
    key: "support",
    label: "Help & Support",
    path: "/admin/suport",
    icon: <HiOutlineQuestionMarkCircle />,
  },
];
