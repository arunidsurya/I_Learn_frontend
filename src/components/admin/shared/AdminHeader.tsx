import { Menu, Popover, Transition } from "@headlessui/react";
import axios from "axios";
import classNames from "classnames";
import React, { Fragment, useEffect } from "react";
import {
  HiOutlineBell,
  HiOutlineChatAlt,
  HiOutlineSearch,
} from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { resetAdmin } from "../../../app/features/loginSlice";

const AdminHeader: React.FC = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const dispatch = useDispatch();

  const admin = useSelector((state: RootState) => state.login.admin);

  const localStorageToken = localStorage.getItem("admin_accessToken");
  const cookieToken = cookies.get("admin_AccessToken");

  useEffect(() => {
    if (localStorageToken !== cookieToken) {
      localStorage.removeItem("admin_AccessToken");
      cookies.remove("admin_AccessToken");

      navigate("/admin_login");
    }
  }, []);

  const handleLogout = () => {
    axios
      .get("http://localhost:5000/api/v1/admin/logout", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          // console.log(response.data);
          dispatch(resetAdmin());
          localStorage.removeItem("admin");
          localStorage.removeItem("admin_accessToken");
          navigate("/admin_login");
        }
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  return (
    <div className="bg-white h-16 px-4 flex justify-between items-center border-b border-gray-200 ">
      <div className="relative">
        <HiOutlineSearch
          fontSize={20}
          className="text-gray-400 absolute top-1/2 -translate-y-1/2 left-3"
        />
        <input
          type="text"
          placeholder="Search..."
          className="text-sm focus:outline-none active:outline-none h-10 w-[24rem] border border-gray-300 rounded-lg pl-11 pr-4"
        />
      </div>
      <div className="flex items-center gap-2 mr-2">
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={classNames(
                  open && "bg-gray-200",
                  "p-1.5 rounded-sm inline-flex items-center text-gray-700 hover:bg-gray-200 focus:outline-gray-200 active:bg-gray-100"
                )}
              >
                <HiOutlineChatAlt fontSize={24} />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute right-0 z-10 mt-2.5 w-80">
                  <div className="bg-shite rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                    <strong className="text-gray-700 font-medium">
                      Messages
                    </strong>
                    <div className="mt-2 py-1 text-sm">
                      This is messages panel
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={classNames(
                  open && "bg-gray-200",
                  "p-1.5 rounded-sm inline-flex items-center text-gray-700 hover:bg-gray-200 focus:outline-gray-200 active:bg-gray-100"
                )}
              >
                <HiOutlineBell fontSize={24} />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute right-0 z-10 mt-2.5 w-80">
                  <div className="bg-shite rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                    <strong className="text-gray-700 font-medium">
                      Notifications
                    </strong>
                    <div className="mt-2 py-1 text-sm">
                      This is Notification panel
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="ml-2 inline-flex rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400">
              <span className="sr-only">Open user menu</span>
              <div
                className="h-10 w-10 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center"
                style={{
                  backgroundImage:
                    'url("https://sources.unsplash.com/80x80?face")',
                }}
              >
                <span className="sr-only">Arun Surendran</span>
              </div>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <div
                      onClick={() => navigate("/profile")}
                      className={classNames(
                        active && "bg-gray-100",
                        "text-gray-700 focus:bg-gray-200 cursor-pointer rounded-sm px-4 py-2"
                      )}
                    >
                      Hi {admin?.name}
                    </div>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <div
                      onClick={() => navigate("/admin/settings")}
                      className={classNames(
                        active && "bg-gray-100",
                        "text-gray-700 focus:bg-gray-200 cursor-pointer rounded-sm px-4 py-2"
                      )}
                    >
                      settings
                    </div>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <div
                      onClick={handleLogout}
                      className={classNames(
                        active && "bg-gray-100",
                        "text-gray-700 focus:bg-gray-200 cursor-pointer rounded-sm px-4 py-2"
                      )}
                    >
                      Logout
                    </div>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};

export default AdminHeader;
