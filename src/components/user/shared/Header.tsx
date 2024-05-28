import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { resetUser } from "../../../redux/features/loginSlice";
import { logout } from "../../services/api/userApi";

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
  const [menuOpen, setMenuOpen] = useState<boolean>(false);


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.login.user);
  const location = useLocation();
  

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const CookieToken = Cookies.get("access_token");

    if (!accessToken || CookieToken === undefined) {
      setIsLoggedIn(false);
      localStorage.removeItem("accessToken");
      Cookies.remove("access_token");
      dispatch(resetUser());
    } else {
      setIsLoggedIn(true);
    }

    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      const parseData = JSON.parse(storedUserData);
      const currentUser: User = parseData.user;
      setSavedUser(currentUser);
    }
  }, [dispatch]);

  const handleLogout = async () => {
    const response = await logout();
    if (response?.data.success) {
      dispatch(resetUser());
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      setIsLoggedIn(false);
      navigate("/");
    }
  };

  const isActive = (path: string) => location.pathname === path;

  

  return (
    <header>
      <nav className="border border-b-gray-200 w-full shadow-md border-gray-200 px-2 text-[1.2rem] sm:px-3 py-5 dark:bg-gray-800 ">
        <div className="flex flex-wrap justify-between items-center mx-[20px] max-w-screen">
          <Link to="/" className="flex items-center">
            <h2 className="text-blue-900 text-3xl font-bold">E-Learning</h2>
          </Link>
          <div className="flex items-center lg:order-2">
            {isLoggedIn ? (
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="ml-2 inline-flex rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <span className="sr-only">Open user menu</span>
                    <div
                      className="h-10 w-10 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center"
                      style={{
                        backgroundImage: savedUser?.avatar
                          ? `url(${savedUser.avatar.url})`
                          : 'url("https://sources.unsplash.com/80x80?face")',
                      }}
                    >
                      <span className="sr-only">{savedUser?.name}</span>
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
                  <Menu.Items className="origin-top-right z-50 absolute right-0 mt-2 w-60 rounded-sm shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1 ">
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            className={classNames(
                              active && "bg-gray-100",
                              "text-gray-700 focus:bg-gray-200  rounded-sm px-4 py-2 flex gap-2 items-center my-2"
                            )}
                          >
                            <div
                              className="h-12 w-12 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center "
                              style={{
                                backgroundImage: `url(${user?.avatar?.url})`,
                              }}
                            ></div>
                            <span className="ml-2">{user?.name}</span>
                          </div>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            onClick={() => navigate("/manage_account")}
                            className={classNames(
                              active && "bg-gray-100",
                              "text-gray-700 focus:bg-gray-200 cursor-pointer rounded-sm px-4 py-2"
                            )}
                          >
                            My Account
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
                <Link
                  to="/login"
                  className="text-gray-800  dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-[1.1rem] px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                >
                  Log in
                </Link>
                <Link
                  to="/user_register"
                  className="text-white text-[1.3rem] bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                >
                  Sign up
                </Link>
              </div>
            )}
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {menuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              )}
            </button>
          </div>
          <div
            className={`${
              menuOpen ? "block" : "hidden"
            } justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
            id="mobile-menu-2"
          >
            <ul className="flex flex-col  text-[1.3rem] mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <Link
                  to="/"
                  className={classNames(
                    "block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700",
                    isActive("/") && "text-blue-500"
                  )}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/courses"
                  className={classNames(
                    "block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700",
                    isActive("/courses") && "text-blue-500"
                  )}
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={classNames(
                    "block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700",
                    isActive("/about") && "text-blue-500"
                  )}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/policy"
                  className={classNames(
                    "block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700",
                    isActive("/policy") && "text-blue-500"
                  )}
                >
                  Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className={classNames(
                    "block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700",
                    isActive("/faq") && "text-blue-500"
                  )}
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
