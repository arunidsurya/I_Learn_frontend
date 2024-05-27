import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <div className="bg-white-200  h-auto mt-8 px-10 py-8 flex flex-col md:flex-row md:justify-between md:items-start sm:flex-row sm:justify-between sm:items-start border-t border-gray-300 text-gray-600">
      <div className="flex flex-col mb-4 sm:mb-0">
        <h4 className="text-lg font-semibold mb-2">About</h4>
        <Link to="/" className="hover:text-gray-500">
          Our Story
        </Link>
        <Link to="/" className="hover:text-gray-500">
          Privacy Policy
        </Link>
        <Link to="/" className="hover:text-gray-500">
          FAQ
        </Link>
      </div>
      <div className="flex flex-col mb-4 sm:mb-0">
        <h4 className="text-lg font-semibold mb-2">Quick links</h4>
        <Link to="/" className="hover:text-gray-500">
          Courses
        </Link>
        <Link to="/" className="hover:text-gray-500">
          My Account
        </Link>
        <Link to="/" className="hover:text-gray-500">
          Course Dashboard
        </Link>
      </div>
      <div className="flex flex-col mb-4 sm:mb-0">
        <h4 className="text-lg font-semibold mb-2">Social links</h4>
        <Link to="/" className="hover:text-gray-500">
          YouTube
        </Link>
        <Link to="/" className="hover:text-gray-500">
          Instagram
        </Link>
        <Link to="/" className="hover:text-gray-500">
          GitHub
        </Link>
      </div>
      <div className="flex flex-col">
        <h4 className="text-lg font-semibold mb-2">Contact Info</h4>
        <h5>Call us: +914654854154</h5>
        <h5>Address: East Menington, Las Vegas, CA</h5>
        <h5>Mail: support@elearning.net</h5>
      </div>
    </div>
  );
};

export default Footer;
