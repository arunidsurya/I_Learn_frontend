import React from "react";
import { Link } from "react-router-dom";

const HeaderCommon: React.FC = () => {
  return (
    <header>
      <nav className="border border-b-gray-200 w-full shadow-md border-gray-200 px-2 text-[1.2rem] sm:px-3 py-5 dark:bg-gray-800 ">
        <div className="flex flex-wrap justify-between items-center mx-[20px] max-w-screen">
          <Link to="/" className="flex items-center">
            <h2 className="text-blue-900 text-3xl font-bold">I-LEARN</h2>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default HeaderCommon;
