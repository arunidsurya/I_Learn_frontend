import React from "react";
import studyImage from "../../../assets/HomePage/learning4.png";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserHome: React.FC = () => {
  return (
    <div className="flex flex-col gap-2 mt-4 w-full  ">
      <div className="flex flex-col md:flex-row gap-2 w-full ">
        <div className="p-4 flex rounded-full items-center md:w-1/2">
          <img
            src={studyImage}
            alt="Img1"
            className="w-5/6 h-5/6 md:ml-20 rounded-full border border-white-200"
          />
        </div>
        <div className="rounded-sm p-4 flex flex-1 flex-col md:w-1/2">
          <div className="flex flex-col gap-8 items-left">
            <h1 className="text-3xl md:text-7xl font-bold w-full md:w-4/6">
              Improve Your Online Learning Experience Better Instantly
            </h1>
            <p>
              we have 20k+ online courses & 500k+ online registered students.
              Find your desired Courses from them.
            </p>
          </div>
          <div className="mt-20 flex flex-col md:flex-row">
            <input
              type="text"
              placeholder="Search Courses "
              className="border border-gray-200 w-full md:w-4/6 h-12 p-4"
            />
            <span>
              <FaSearch
                className="cursor-pointer ml-2 md:ml-0 mt-2 md:mt-0"
                style={{
                  width: 47,
                  height: 47,
                  border: "1px solid gray",
                  borderRadius: "0px 5px 5px 0px",
                  backgroundColor: "green",
                  color: "white",
                  padding: 8,
                }}
              />
            </span>
          </div>
          <p className="mt-8">
            500K+ People already trusted us.{" "}
            <Link to={"/courses"} className="text-green-600">
              View Courses
            </Link>
          </p>
        </div>
      </div>

      <div className="m-auto w-[90%] md:w-800px lg:w-[80%] mt-8">
        <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl lg:!leading-[60px] font-[700] tracking-tight">
          Expand Your Career{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500">
            Opportunity
          </span>{" "}
          <br /> With Our Courses
        </h1>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[35px] mb-12 border-0">
          {/* Add your course components here */}
        </div>
      </div>
    </div>
  );
};

export default UserHome;
