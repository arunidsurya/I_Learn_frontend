import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <div className="bg-white-200 h-40 px-10 flex justify-between items-center border-t border-gray-300 ">
      <div className="flex flex-col justify-between ">
        <h4 className="text-lg font-semibold">About</h4>
        <Link to={"/"} className="hover:text-gray-500">
          Our Story
        </Link>
        <Link to={"/"} className="hover:text-gray-500">
          Privacy Policy
        </Link>
        <Link to={"/"} className="hover:text-gray-500">
          FAQ
        </Link>
      </div>
      <div className="flex flex-col justify-between ">
        <h4 className="text-lg font-semibold">Quick links</h4>
        <Link to={"/"} className="hover:text-gray-500">
          courses
        </Link>
        <Link to={"/"} className="hover:text-gray-500">
          My Account
        </Link>
        <Link to={"/"} className="hover:text-gray-500">
          Course Dashboard
        </Link>
      </div>
      <div className="flex flex-col justify-between ">
        <h4 className="text-lg font-semibold">Social links</h4>
        <Link to={"/"} className="hover:text-gray-500">
          Youtube
        </Link>
        <Link to={"/"} className="hover:text-gray-500">
          instagram
        </Link>
        <Link to={"/"} className="hover:text-gray-500">
          github
        </Link>
      </div>
      <div className="flex flex-col justify-between ">
        <h4 className="text-lg font-semibold">contact Ino</h4>
        <h5>call us:+914654854154</h5>
        <h5>Address:East Menington,Lasvegas,CA</h5>
        <h5>Mail:support@elearning.net</h5>
      </div>
    </div>
  );
};

export default Footer;
