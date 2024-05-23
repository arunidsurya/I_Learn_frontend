import React from "react";
import { Link, useLocation } from "react-router-dom";
import errorImage from "../../assets/error404.jpg";

const Error404:React.FC = () => {
  const locationData = useLocation();

  const location = locationData.pathname;

  const data = location.split("/")[1];

  const url =
    data === "admin" ? "/admin" : data === "instructor" ? "/instructor" : "/";

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${errorImage})` }}
    >
      <div className="text-9xl text-gray-400 font-semibold">404</div>
      <div className="text-3xl text-gray-600 mb-4">Page Not Found</div>
      <Link
        to={`${url}`}
        className="px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition-colors"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default Error404;
