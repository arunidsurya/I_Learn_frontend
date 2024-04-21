import { Menu, Transition } from "@headlessui/react";
import axios from "axios";
import classNames from "classnames";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { resetUser } from "../../../app/features/loginSlice";

interface User {
  _id: string;
  name: string;
  email: string;
  gender: string;
  password: string;
  isVerified: boolean;
  isBlocked: boolean;
  courses: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  avatar?: {
    url: string;
    public_id: string;
  };
}

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [savedUser, setSavedUser] = useState<User | null | undefined>();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.login.user);

  // console.log(user?.name);

  useEffect(() => {
    // Check if user data exists in localStorage
    // const storedUserData = localStorage.getItem("user");
    // const accessToken = localStorage.getItem("accessToken");
    const CookieToken = Cookies.get("access_token");

    if (CookieToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false); // User is not logged in
    }
    const storedUserData = localStorage.getItem("user");
    // console.log("user", storedUserData);
    if (storedUserData) {
      const parseData = JSON.parse(storedUserData);
      const currentUser: User = parseData.user;
      console.log(currentUser);
      setSavedUser(currentUser);
    }
  }, []);

  const handleLogout = () => {
    axios
      .get("http://localhost:5000/api/v1/user/logout", {
        withCredentials: true,
      })
      .then((response) => {
        // console.log(response.data);
        if (response.data.success) {
          // console.log(response.data);
          dispatch(resetUser());
          localStorage.removeItem("user");
          localStorage.removeItem("accessToken");
          setIsLoggedIn(false);
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error during logout:", error);
        navigate("/");
      });
  };

  return (
    <div className="bg-white-200 h-20 px-8 flex  justify-between items-center border-b border-gray-300 ">
      <div>
        <h2 className="text-blue-900 text-3xl font-bold ">E-Learning</h2>
      </div>
      <div className="flex items-center gap-2 mr-2">
        <div className="flex gap-12 ">
          <Link to={"/"} className="hover:text-gray-500">
            Home
          </Link>
          <Link to={"/courses"} className="hover:text-gray-500">
            Courses
          </Link>
          <Link to={"/about"} className="hover:text-gray-500">
            About
          </Link>
          <Link to={"/policy"} className="hover:text-gray-500">
            Policy
          </Link>
          <Link to={"/"} className="hover:text-gray-500">
            FAQ
          </Link>

          {isLoggedIn ? (
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="ml-2 inline-flex rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400">
                  <span className="sr-only">Open user menu</span>
                  <div
                    className="h-8 w-8 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center"
                    style={{
                      backgroundImage: savedUser?.avatar
                        ? `url(${savedUser.avatar.url})`
                        : 'url("https://sources.unsplash.com/80x80?face")',
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
                          onClick={() => navigate("/manage_account")}
                          className={classNames(
                            active && "bg-gray-100",
                            "text-gray-700 focus:bg-gray-200 cursor-pointer rounded-sm px-4 py-2 flex gap-2 items-center border-b border-neutral-700 my-2"
                          )}
                        >
                          <div
                            className="h-8 w-8 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center "
                            style={{
                              backgroundImage:
                                'url("https://sources.unsplash.com/80x80?face")',
                            }}
                          ></div>

                          <span>{user?.name}</span>
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
          ) : (
            <div className="flex gap-4">
              <Link to={"/login"}>Login</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
