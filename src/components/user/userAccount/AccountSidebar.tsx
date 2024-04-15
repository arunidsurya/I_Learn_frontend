import axios from "axios";
import React from "react";
import { FaGraduationCap } from "react-icons/fa";
import { FcBullish } from "react-icons/fc";
import { IoMdLogOut } from "react-icons/io";
import { MdAccountBalance } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";

const AccountSidebar: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    axios
      .get("http://localhost:5000/api/v1/user/logout", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          // console.log(response.data);
          localStorage.removeItem("user");
          localStorage.removeItem("accessToken");
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  return (
    <div className="flex flex-col bg-blue-900 w-60 p-3 mx-8 mt-6 text-white min-h-[500px]">
      <div className="flex-1 py-8 flex flex-col gap-0.5">
        <div className="flex items-center gap-2 px-1 py-3 text-lg">
          <MdAccountBalance />
          <span className="text-neutral-100">
            <Link to={"/manage_account"}>My account</Link>
          </span>
        </div>
        <div className="flex items-center gap-2 px-1 py-3 text-lg">
          <RiLockPasswordFill />
          <span className="text-neutral-100">
            <Link to={"/manage_account/change_password"}>Change Password</Link>
          </span>
        </div>
        <div className="flex items-center gap-2 px-1 py-3 text-lg">
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
