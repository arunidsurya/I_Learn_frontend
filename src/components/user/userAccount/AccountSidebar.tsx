import React from "react";
import { FaGraduationCap } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { MdAccountBalance } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../services/api/userApi";
import { useDispatch } from "react-redux";
import { resetUser, setLoggedIn } from "../../../redux/features/loginSlice";

const AccountSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

const dispatch = useDispatch();

    const handleLogout = async () => {
      const response = await logout();
      if (response?.data.success) {
        dispatch(resetUser());
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        dispatch(setLoggedIn(false))
        navigate("/");
      }
    };

  return (
    <div className="flex flex-col bg-blue-900 w-60 p-3 mx-8 mt-6 text-white min-h-[500px] rounded">
      <div className="flex-1 py-8 flex flex-col gap-0.5">
        <div
          className={`flex items-center gap-2 px-1 py-3 text-lg ${
            location.pathname === "/manage_account" &&
            "text-blue-500 border-b-2 border-blue-500"
          }`}
        >
          <MdAccountBalance />
          <span className="text-neutral-100">
            <Link to={"/manage_account"}>My account</Link>
          </span>
        </div>
        <div
          className={`flex items-center gap-2 px-1 py-3 text-lg ${
            location.pathname === "/manage_account/change_password" &&
            "text-blue-500 border-b-2 border-blue-500"
          }`}
        >
          <RiLockPasswordFill />
          <span className="text-neutral-100">
            <Link to={"/manage_account/change_password"}>Change Password</Link>
          </span>
        </div>
        <div
          className={`flex items-center gap-2 px-1 py-3 text-lg ${
            location.pathname === "/manage_account/enrolled_courses" &&
            "text-blue-500 border-b-2 border-blue-500"
          }`}
        >
          <FaGraduationCap />
          <span className="text-neutral-100">
            <Link to={"/manage_account/enrolled_courses"}>
              Enrolled Courses
            </Link>
          </span>
        </div>
        <div
          className="flex items-center gap-2 px-1 py-3 text-lg cursor-pointer"
          onClick={handleLogout}
        >
          <IoMdLogOut />
          <span className="text-neutral-100">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default AccountSidebar;
