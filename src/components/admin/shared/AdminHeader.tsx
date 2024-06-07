import { Menu, Popover, Transition } from "@headlessui/react";
import classNames from "classnames";
import React, { Fragment, useEffect, useState } from "react";
import {
  HiOutlineBell,
  HiOutlineChatAlt,
  HiOutlineSearch,
} from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { resetAdmin } from "../../../redux/features/loginSlice";
import sound from '../../../assets/level-up-191997.mp3';
import backgroundImage from "../../../assets/profile.png";
import { handleChangeNotificationStatus, handleGetSearchResults, handlegetNotifications, logout } from "../../services/api/adminApi";
import socketIo from "socket.io-client";
import toast from "react-hot-toast";
import { formatCreatedAt } from "../../services/formats/FormatDate";
import debounce from 'lodash.debounce';


const baseUrl = import.meta.env.VITE_SOCKET_SERVER_URL;
const socket = socketIo(baseUrl, { transports: ["websocket"] });

interface Notification extends Document {
  _id:string,
  title: string;
  message: string;
  status: string;
  userId: string;
  createdAt:Date;
}

const AdminHeader: React.FC = () => {

  const [notification, setNotification] = useState<Notification[]>([]);
  const [notificationStatus, setNotificationStatus] = useState(0);
  const navigate = useNavigate();
  const cookies = new Cookies();
  const dispatch = useDispatch();

  const admin = useSelector((state: RootState) => state.login.admin);


  const localStorageToken = localStorage.getItem("admin_accessToken");
  // const cookieToken = cookies.get("admin_AccessToken");

    useEffect(() => {
      if (!localStorageToken ) {
        localStorage.removeItem("admin_AccessToken");
        cookies.remove("admin_AccessToken");

        navigate("/admin_login");
      }
    }, []);

  const getNotifications = async()=>{
    const response = await handlegetNotifications();

    if(response?.data.success){
//  console.log(response?.data.result);

    setNotification(response?.data.result)
    
    }else{
      toast.error(response?.data.message)
    } 

  }

      useEffect(() => {
        getNotifications();
      }, [notificationStatus]);
  

      useEffect(() => {
        socket.on("connect", () => {
          console.log("Socket connected");
        });


      }, []);

        function play() {
          new Audio(sound).play();
        }

        const receiveMessageHandler = (data: {
          title: string,
          messgae: string,
          userId: string,
        }) => {
          console.log(data);
          
          setNotification((prevData: any) => [...prevData, data]);
          play()
        };

        useEffect(() => {
          // Subscribe to "receive_message" event
          socket.on("receive_notification", receiveMessageHandler);

          // Clean up subscription on unmount
          return () => {
            socket.off("receive_message", receiveMessageHandler);
          };
        }, [socket]);




  const handleLogout = async() => {

    try {
      const response = await logout();
          if (response?.data.success) {
            dispatch(resetAdmin());
            localStorage.removeItem("admin");
            localStorage.removeItem("admin_accessToken");
            navigate("/admin_login");
          }
    } catch (error) {
      console.log(error);
      
    }
  };

const handleNotification=async(id:string)=>{
  try {
    const response = await handleChangeNotificationStatus(id)
    if(response?.data.success){
      setNotificationStatus((state:any)=>state===0 ? 1 : 0)
    }
  } catch (error) {
    console.log(error);
    
  }
}

const handleSearch = async (searchKey:string) => {
  try {
    const response = await handleGetSearchResults(searchKey);

    if (response && response.data && response.data.result) {
      const courses = response.data.result;
      navigate("course_tile_home", { state: { courses } });
    } else {
      // Handle case when no courses are found
      console.error("No courses found");
      navigate("course_tile_home", { state: { courses: [] } });
    }
  } catch (error) {
    console.error("Error fetching search results:", error);
    // Optionally navigate with an empty courses array or handle error accordingly
    navigate("course_tile_home", { state: { courses: [] } });
  }
};

const debounceRequest = debounce((searchKey:string)=>handleSearch(searchKey),500)

  return (
    <div className="bg-white h-16 px-4 flex justify-between items-center border-b border-gray-200 ">
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
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
                  "relative p-1.5 rounded-sm inline-flex items-center text-gray-700 hover:bg-gray-200 focus:outline-gray-200 active:bg-gray-100"
                )}
              >
                <HiOutlineBell fontSize={25} />
                <span className="relative">
                  <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 text-white w-4 h-4 flex justify-center items-center text-xs">
                    {notification.length}
                  </div>
                </span>
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
                <Popover.Panel className="absolute right-0 z-10 mt-5 w-80">
                  <div className="bg-white rounded-lg shadow-md ring-1 ring-black ring-opacity-5 p-4 max-w-md mx-auto">
                    <div className="border-b pb-2 mb-2">
                      <strong className="text-lg text-gray-700 font-medium">
                        Notifications
                      </strong>
                    </div>
                    <div className="max-h-80 overflow-y-auto space-y-2">
                      {notification.map((item, index) => (
                        <div
                          className="bg-gray-100 rounded-md shadow-sm border border-gray-200"
                          key={index}
                        >
                          <div className="flex items-center justify-between p-3">
                            <div>
                              <p className="text-sm font-semibold text-gray-800">
                                {item.title}
                              </p>
                              <p className="text-xs text-gray-600">
                                {formatCreatedAt(item.createdAt)}
                              </p>
                            </div>
                            <p
                              className="text-blue-500 text-xs cursor-pointer hover:underline"
                              onClick={() => handleNotification(item._id)}
                            >
                              Mark as read
                            </p>
                          </div>
                          <p className="px-3 pb-3 text-sm text-gray-700">
                            {item.message}
                          </p>
                        </div>
                      ))}
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
                  backgroundImage: `url(${backgroundImage})`,
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
                      onClick={() => navigate("/admin/manage-account")}
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
      </div>
    </div>
  );
};

export default AdminHeader;
