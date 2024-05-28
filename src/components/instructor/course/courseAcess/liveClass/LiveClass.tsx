import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import { FaLock } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutPremium from "./CheckoutPremium";
import { handleGetOneCourse } from "../../../../services/api/userApi";


interface Course {
  _id: string;
  courseTitle: string;
  instructorName: string;
  instructorId: string;
  category: string;
  description: string;
  price: number;
  estimatedPrice?: number;
  totalVideos?: number;
  thumbnail: string;
  tags: string;
  level: string;
  demoUrl: string;
  benefits: { title: string }[];
  prerequisites: { title: string }[];
  reviews: [];
  courseData: [];
  classSchedule: {
    date: string;
    time: string;
    description: string;
    meetingCode: string;
  };
  chat: [];
  approved?: boolean;
  ratings?: number;
  purchased?: number;
}

type Props = {
  error?: string;
  clientSecret: string;
  stripePromise: any;
  courseId: string;
};


const LiveClass: React.FC<Props> = ({clientSecret,stripePromise,courseId}) => {

  const [open, setOpen] = useState(false);
  const [course, setCourse] = useState < Course>();

  const user = useSelector((state: RootState) => state.login.user);


  const getCourse =async()=>{
    console.log(courseId);
    
    const res = await handleGetOneCourse(courseId)
    // console.log(res?.data.result.course);
    setCourse(res?.data.result.course);
    
  }

  useEffect(()=>{
getCourse()
  },[])

  const handleClick =()=>{
    setOpen(true)
  }
  

  return (
    <>
      {user?.premiumAccount ? (
        <div>
          {course?.classSchedule.date ? (
            <div className="flex flex-col justify-center items-center gap-2 border border-gray-400 min-w-[50%] p-5 mb-10 bg-blue-900 text-white rounded-md ">
              <h1 className="font-bold text-[2rem]">Upcoming Meeting</h1>
              <h1>Date : {course.classSchedule.date}</h1>
              <h1>Time : {course.classSchedule.time}</h1>
              <h1>Subject:{course.classSchedule.description}</h1>
              <button
                className="bg-green-500 rounded-md w-[30%] h-[40px]"
                onClick={() => {
                  const url = `/room/${course.classSchedule.meetingCode}`;
                  window.open(url, "_blank");
                }}
              >
                Join Meeting
              </button>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center gap-2 border border-gray-400 min-w-[50%] p-5 mb-10 bg-blue-900 text-white rounded-md ">Live classes will be scheduled shortly</div>
          )}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center rounded ml-[30%] mt-8 bg-gray-300 min-h-[200px] w-[400px] z-50 ">
          <FaLock size={40} color="red" />
          <h1 className="mt-4">
            Unlock premium account to access this feature
          </h1>
          <div className="mt-4">
            {/* Added a div to hold the button */}
            <button
              className="bg-green-500 rounded-full p-2 text-white"
              onClick={handleClick}
            >
              Upgrade to Premium ₹500
            </button>
          </div>
        </div>
      )}
      {
        <>
          {open && (
            <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center">
              <div className="bg-[#00000036] w-full h-full absolute top-0 left-0"></div>
              <div className="w-[500px] h-[500px] bg-white rounded-xl shadow p-3 relative">
                <div className="absolute top-0 right-0">
                  <IoCloseOutline
                    size={40}
                    className="text-black cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                </div>
                <div className="w-full">
                  {stripePromise && clientSecret && (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                      <CheckoutPremium setOpen={setOpen} courseId={courseId} />
                    </Elements>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      }
    </>
  );
};

export default LiveClass;
