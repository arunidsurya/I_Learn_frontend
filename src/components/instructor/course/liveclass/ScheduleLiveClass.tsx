import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from 'yup'
import { handleAddSchedule, handleGetOneCourse } from "../../../services/api/tutorApi";
import toast from "react-hot-toast";

interface Course {
  _id:string;
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
  classSchedule:{date:string,time:string,description:string,meetingCode:string};
  chat:[] ,
  approved?:boolean;
  ratings?: number;
  purchased?: number;
}

const ScheduleLiveClass: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const courseId = location.state;

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [course, setCourse] = useState<Course>()
  const [isSuccesss, setIsSuccesss] = useState(false)
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    meetingCode: "",
    description: "",
  });

  const getCourse =async()=>{
    const res = await handleGetOneCourse(courseId)
    // console.log(res?.data.result);
    
    setCourse(res?.data.result) 
  }

  useEffect(() => {
    getCourse();
  }, [isSuccesss]);

  const handleChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validationSchema = Yup.object({
    date: Yup.string()
      .required("Field is required")
      .test("date", "Date cannot be in the past", function (value) {
        // Parse the date string into a Date object
        const selectedDate = new Date(value);
        // Get the current date
        const currentDate = new Date();
        // Check if the selected date is before the current date
        return selectedDate >= currentDate;
      }),
    time: Yup.string()
      .required("Time is required")
      .test("time", "Time cannot be in the past", function (value) {
        // Split the time string into hours and minutes
        const [hours, minutes] = value.split(":").map(Number);
        // Get the current time
        const currentTime = new Date();
        // Set the current time to the selected hours and minutes
        currentTime.setHours(hours, minutes, 0, 0);
        // Check if the selected time is after or equal to the current time
        return currentTime >= new Date();
      }),
    meetingCode: Yup.string().required("Field is required"),
    description: Yup.string().required("Field is required"),
  });

  const handleSubmit=async(e:any)=>{
    e.preventDefault();
    setErrors({})
    try {
        await validationSchema.validate(formData,{abortEarly:false})
        // console.log(formData);
        const response = await handleAddSchedule(courseId,formData.date,formData.time,formData.meetingCode,formData.description)

        if(response?.data.success){
          setIsSuccesss(true)
            toast.success("Live session scheduled successfully")
        }else{
            toast.error("internal server error please try again later!!")
        }
        
        
    } catch (error:any) {
            const newError: { [key: string]: string } = {};

            error.inner.forEach((err: any) => {
              newError[err.path] = err.message;
            });
            setErrors(newError);   
    }
    
  }
  return (
    <div className="flex flex-col justify-center items-center ">
      <h1 className="font-bold text-[2rem]">Upcoming Meeting</h1>
      {course?.classSchedule.date && (
        <div className="flex flex-col justify-center items-center gap-2 border border-gray-400 min-w-[50%] p-5 mb-10 bg-blue-900 text-white rounded-md ">
          <h1>Date : {course.classSchedule.date}</h1>
          <h1>Time : {course.classSchedule.time}</h1>
          <h1>Subject:{course.classSchedule.description}</h1>
          <button
            className="bg-green-500 rounded-md w-[30%] h-[40px]"
            onClick={() =>
              navigate(`/instructor/room/${course.classSchedule.meetingCode}`)
            }
          >
            Join Meeting
          </button>
        </div>
      )}
      <h1 className="font-bold text-[2rem]">Schedule New Meeting</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 border border-gray-400 min-w-[50%] p-5 bg-blue-900 text-white rounded-md "
      >
        <label htmlFor="date">Date</label>
        {errors.date && (
          <div>
            <p className="text-red-500">*{errors.date}</p>
          </div>
        )}
        <input
          type="date"
          name="date"
          id=""
          className="min-w-[20%] w-full border h-[40px] border-gray-400 rounded-md text-black"
          onChange={handleChange}
        />
        <label htmlFor="date">Time</label>
        {errors.time && (
          <div>
            <p className="text-red-500">*{errors.time}</p>
          </div>
        )}
        <input
          type="time"
          name="time"
          id=""
          className="min-w-[20%] w-full border border-gray-400 rounded-md h-[40px] text-black"
          onChange={handleChange}
        />
        <label htmlFor="date">Meeting code</label>
        {errors.meetingCode && (
          <div>
            <p className="text-red-500">*{errors.meetingCode}</p>
          </div>
        )}
        <input
          type="text"
          name="meetingCode"
          id=""
          className="min-w-[20%] w-full border border-gray-400 rounded-md h-[40px] text-black"
          onChange={handleChange}
        />
        <label htmlFor="date">Description</label>
        {errors.description && (
          <div>
            <p className="text-red-500">*{errors.description}</p>
          </div>
        )}
        <textarea
          name="description"
          cols={20}
          rows={5}
          id=""
          className="min-w-[20%] w-full border border-gray-400 rounded-md text-black"
          onChange={handleChange}
        />
        <div className="flex items-center justify-center mb-5 mt-5">
          <button
            className="bg-green-500 rounded-md w-[30%] h-[40px]"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleLiveClass;
