import { Menu, Popover, Transition } from "@headlessui/react";
import classNames from "classnames";
import React, { Fragment, useEffect, useState } from "react";
import {
  HiOutlineBell,
  HiOutlineChatAlt,
  HiOutlineSearch,
} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../redux/store";
import { Cookies } from "react-cookie";
import { resetTutor, setTutorLoggedIn } from "../../../redux/features/loginSlice";
import { handleGetSearchResults, handleLogout } from "../../services/api/tutorApi";
import debounce from 'lodash.debounce';

interface Tutor {
  _id?: string;
  name: string;
  email: string;
  gender: string;
  institute: string;
  qualifiaction: string;
  experience: string;
  avatar?: {
    url: string;
    public_id: string;
  };
  isVerified?: boolean;
  isBolcked?: boolean;
}


const InstHeader: React.FC = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const [tutor, setTutor] = useState<Tutor | null>(null)

  const savedTutor = useSelector((state: RootState) => state.login.tutor);


  const localStorageToken = localStorage.getItem("tutor_accessToken");
  // const cookieToken = cookies.get("tutor_token");

  useEffect(() => {
    if (!localStorageToken) {
      localStorage.removeItem("tutor_accessToken");
      cookies.remove("tutor_token");
      dispatch(resetTutor());
      dispatch(setTutorLoggedIn(false))
      navigate("/inst_login");
    }else{
      setTutor(savedTutor)
    }
  }, []);


  const handleLogoutFunction = async() => {
    try {
      const response = await handleLogout();
          if (response?.data.success) {
            dispatch(resetTutor());
            localStorage.removeItem("tutor");
            localStorage.removeItem("tutor_accessToken");
            dispatch(setTutorLoggedIn(false))
            navigate("/inst_login");
          }
    } catch (error) {
      console.log(error);
    }
  };

const handleSearch = async (searchKey:string) => {
  try {
    const response = await handleGetSearchResults(searchKey);

    if (response && response.data && response.data.result) {
      const courses = response.data.result;
      navigate("/instructor/courses", { state: { courses } });
    } else {
      console.error("No courses found");
      navigate("/instructor/courses", { state: { courses: [] } });
    }
  } catch (error) {
    console.error("Error fetching search results:", error);
    navigate("/instructor/courses", { state: { courses: [] } });
  }
};

const debounceRequest = debounce((searchKey:string)=>handleSearch(searchKey),500)

  return (
    <div className="bg-white h-16 px-4 flex justify-between items-center border-b border-gray-200 ">
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          // value={searchKey}
          className="text-sm focus:outline-none active:outline-none h-10 w-[24rem] border border-gray-300 rounded-lg pl-11 pr-4"
          onChange={(e: any) => debounceRequest(e.target.value)}
        />
        <HiOutlineSearch
          fontSize={20}
          className="text-gray-400 absolute top-1/2 -translate-y-1/2 left-3"
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
                className="h-8 w-8 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center"
                style={{
                  backgroundImage: `url(${tutor?.avatar?.url})`,
                }}
              >
                <span className="sr-only">{tutor?.name}</span>
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
                      Hi, {tutor?.name}
                    </div>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <div
                      onClick={() => navigate("/instructor/manage-account")}
                      className={classNames(
                        active && "bg-gray-100",
                        "text-gray-700 focus:bg-gray-200 cursor-pointer rounded-sm px-4 py-2"
                      )}
                    >
                      Manage Account
                    </div>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <div
                      onClick={handleLogoutFunction}
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

export default InstHeader;
