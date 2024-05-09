import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import { resetUser } from "../../../app/features/loginSlice";
import {Toaster} from 'react-hot-toast'

const UserLayout: React.FC = () => {
  // const dispatch = useDispatch();

  // const clearLocalStorage = () => {
  //   localStorage.removeItem("user");
  //   localStorage.removeItem("accessToken");
  // };

  // const clearReduxStore = () => {
  //   dispatch(resetUser());
  // };

  // useEffect(() => {
  //   // Add event listener to the window's beforeunload event
  //   const handleBeforeUnload = () => {
  //     clearLocalStorage();
  //     clearReduxStore();
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   // Cleanup function to remove event listener when component unmounts
  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);

  return (
    <div className="flex flex-col min-h-screen bg-neutral-100  ">
      <Header />
      <div className="flex-grow">{<Outlet />}</div>
      <Footer />
      <Toaster />
    </div>
  );
};

export default UserLayout;
