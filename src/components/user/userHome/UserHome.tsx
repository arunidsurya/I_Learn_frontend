import React from "react";
import studyImage from "../../../assets/HomePage/learning4.png";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserHome: React.FC = () => {
  return (
    <div className="flex flex-col gap-2 mt-4 w-full  ">
      <div className=" flex gap-2 w-full ">
        <div className=" p-4 flex flex-1  rounded-full items-center ">
          <img
            src={studyImage}
            alt="Img1"
            className=" w-5/6 h-5/6 ml-20 rounded-full border border-white-200"
          />
        </div>
        <div className=" rounded-sm p-4 flex flex-1 flex-col ">
          <div className=" flex flex-col gap-8 items-left">
            <h1 className="text-7xl font-bold w-4/6">
              Improve Your Online Learning Experience Better Instantly
            </h1>
            <p>
              we have 20k+ online courses & 500k+ online registered students.
              Find your desired Courses from them.
            </p>
          </div>
          <div className="mt-20 flex ">
            <input
              type="text"
              placeholder="Search Courses "
              className="border border-gray-200 w-4/6 h-12 "
            />
            <span>
              <FaSearch
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
          <p className="mt-20">
            500K+ Pleople already trusted us.{" "}
            <Link to="" className="text-green-600">
              View Courses
            </Link>
          </p>
        </div>
      </div>

      {/* <div className="bg-black flex gap-2 w-full">
        <div className="bg-white rounded-sm p-4 border border-gray-200 flex flex-1"></div>
        <div className="bg-white rounded-sm p-4 border border-gray-200 flex flex-1">
          component2
        </div>
      </div>

      <div className="bg-black flex gap-2 w-full">
        <div className="bg-white rounded-sm p-4 border border-gray-200 flex flex-1"></div>
        <div className="bg-white rounded-sm p-4 border border-gray-200 flex flex-1">
          component2
        </div>
      </div>

      <div className="bg-black flex gap-2 w-full">
        <div className="bg-white rounded-sm p-4 border border-gray-200 flex flex-1"></div>
        <div className="bg-white rounded-sm p-4 border border-gray-200 flex flex-1">
          component2
        </div>
      </div> */}
    </div>
  );
};

export default UserHome;
