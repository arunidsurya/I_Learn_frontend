import { FaPhoneAlt, FaUsers } from "react-icons/fa";
import { HiOutlineCog, HiOutlineQuestionMarkCircle } from "react-icons/hi";
import { IoIosPlayCircle } from "react-icons/io";
import { IoChatboxEllipses } from "react-icons/io5";
import { MdHomeFilled } from "react-icons/md";
import { RiVideoAddFill } from "react-icons/ri";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/instructor",
    icon: <MdHomeFilled />,
  },
  {
    key: "CreateCourse",
    label: "Create Course",
    path: "/instructor/create_course",
    icon: <RiVideoAddFill />,
  },
  {
    key: "LiveCourses",
    label: "Live Courses",
    path: "/instructor/Live_courses",
    icon: <IoIosPlayCircle />,
  },
  {
    key: "Students",
    label: "Students",
    path: "/instructor/students",
    icon: <FaUsers />,
  },
  {
    key: "Contact",
    label: "Contact",
    path: "/instructor/contact",
    icon: <FaPhoneAlt />,
  },
  {
    key: "Chat",
    label: "Chat",
    path: "/instructor/Chat",
    icon: <IoChatboxEllipses />,
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: "settings",
    label: "Settings",
    path: "/instructor/Settings",
    icon: <HiOutlineCog />,
  },
  {
    key: "support",
    label: "Help & Support",
    path: "/instructor/support",
    icon: <HiOutlineQuestionMarkCircle />,
  },
];
