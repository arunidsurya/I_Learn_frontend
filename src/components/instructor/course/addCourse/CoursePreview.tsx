import React, { useEffect, useState } from "react";
import DemoPlayer from "../DemoPlayer";
import Ratings from "../../utils/Ratings";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseInfo: any;
  prerequisites: any;
  benefits: any;
  handleCourseCreate: any;
  handleSubmit: any;
};

const CoursePreview: React.FC<Props> = ({
  active,
  setActive,
  courseInfo,
  prerequisites,
  benefits,
  handleCourseCreate,
  handleSubmit,
}) => {
  const [demoVideoUrl, setDemoVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    if (courseInfo.demoUrl) {
      const videoObjectUrl = URL.createObjectURL(courseInfo.demoUrl);
      setDemoVideoUrl(videoObjectUrl);
    }
  }, [courseInfo.demoUrl]);

  const discountPercentage =
    ((courseInfo.estimatedPrice - courseInfo.price) /
      courseInfo.estimatedPrice) *
    100;
  const discountPercentagePrice = discountPercentage.toFixed(0);

  const prevButton = () => {
    setActive(active - 1);
  };

  const createCourse = () => {
    console.log("Reached here");
    setActive(active + 1);
    // handleCourseCreate();
    handleSubmit();
  };

  return (
    <div className="w-90% m-auto py-5 mb-5">
      <div className="w-full relative">
        <div className="w-full mt-10">
          {demoVideoUrl !== null && (
            <DemoPlayer
              videoUrl={demoVideoUrl}
              title={courseInfo?.courseTitle}
              width="100%"
            />
          )}
        </div>
        <div className="flex items-center">
          <h1 className="pt-5 text-25px font-bold">
            {courseInfo?.price === 0 ? "Free" : courseInfo.price + "₹"}
          </h1>
          <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80">
            {courseInfo.estimatedPrice}₹
          </h5>
          <h4 className="pl-5 pt-4 text-[22px] font-bold">
            {discountPercentagePrice}% Off
          </h4>
        </div>
        <div className="flex items-center">
          <div className="bg-red-500 text-white  rounded-full flex p-1 font-bold">
            Buy Now {courseInfo.price} ₹
          </div>
        </div>
      </div>
      <div className="flex items-center mt-5 mb-4">
        <input
          type="text"
          name=""
          id=""
          placeholder="Discount code..."
          className="w-1/2 mr-4 h-10 rounded-md border border-black pl-2"
        />
        <div className=" bg-blue-500 w-20 text-white flex items-center justify-center h-10 rounded-full font-bold">
          Apply
        </div>
      </div>
      <p className="pb-1">
        <li>Source code included</li>
      </p>
      <p className="pb-1">
        <li>Full lifetime access</li>
      </p>
      <p className="pb-1">
        <li>Certificate of completion</li>
      </p>
      <p className="pb-1">
        <li>Premium Support</li>
      </p>
      <p className="pb-3 800px:pb-1"></p>
      <div className="w-full">
        <div className="w-full">
          <h1 className="font-Poppins text-[25px] font-[600]">
            {courseInfo.courseTitle}
          </h1>
          <div className="flex items-center jsutify-between pt-3">
            <div className="flex items-center mr-2">
              <Ratings rating={0} />
              <h5>0 Rewiews</h5>
            </div>
            <h5>0 Students</h5>
          </div>
          <br />
          <h1 className="font-Poppins font-[600] text-[25px]">
            What you will learn from this course?
          </h1>
        </div>
      </div>
      {benefits?.map((item: any, index: number) => (
        <div className="w-full flex py-2" key={index}>
          <div className="w-[15px] mr-1">
            <IoCheckmarkDoneOutline size={20} />
          </div>
          <p className="pl-2">{item.title}</p>
        </div>
      ))}
      <br />
      <br />
      <h1 className="font-Poppins font-[600] text-[25px]">
        What are the prerequisites for starting this course?
      </h1>
      {prerequisites?.map((item: any, index: number) => (
        <div className="w-full flex py-2" key={index}>
          <div className="w-[15px] mr-1">
            <IoCheckmarkDoneOutline size={20} />
          </div>
          <p className="pl-2">{item.title}</p>
        </div>
      ))}
      <br />
      <br />
      <div className="w-full">
        <h1 className="font-Poppins text-[25px] font-[600]">Course Details</h1>
        {courseInfo?.description}
      </div>
      <br />
      <br />
      <div className="flex justify-between">
        <input
          className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] items-center rounded mt-8 cursor-pointer"
          onClick={() => prevButton()}
          type="button"
          value="Prev"
        />

        <input
          className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center items-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => createCourse()}
          type="button"
          value="Create Course"
        />
      </div>
    </div>
  );
};

export default CoursePreview;
