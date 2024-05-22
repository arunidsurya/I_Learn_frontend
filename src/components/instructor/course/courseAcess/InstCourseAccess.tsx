import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../../redux/store";
import { getCourseContent } from "../../../services/api/userApi";
import CourseContentList from "./CourseContentList";
import Cookies from "js-cookie";

import socketIo from "socket.io-client";
import CourseMedia from "./courseMedia";
import { handleGetOneCourse } from "../../../services/api/tutorApi";

const baseUrl = import.meta.env.VITE_SOCKET_SERVER_URL;
const socket = socketIo(baseUrl, { transports: ["websocket"] });

const InstCourseAccess = () => {
  const [course, setCourse] = useState<object>();
  const [data, setData] = useState<object[]>([{}]);
  const [activeVideo, setActiveVideo] = useState(0);
  const [isDataUpdated, setIsdataUpdated] = useState(0);
  const [newData, setNewdata] = useState(0);

  const params = useParams();
  const courseId = params._id || "";
  console.log("courseID:",courseId);
  
  const navigate = useNavigate();

  const tutor = useSelector((state:any)=>state.login.tutor)

  const CookieToken = Cookies.get("access_token");


  useEffect(() => {
    const fetchCourseContent = async () => {
      try {

        const res = await handleGetOneCourse(courseId);
        if (res) {
          setCourse(res?.data.result);
          setData(res?.data.result.courseData);
          // console.log(res?.data.result.course.courseData);
        }
        // console.log(res?.data.result.course);
      } catch (error) {
        console.error("Error fetching course content:", error);
      }
    };

    fetchCourseContent();
  }, [courseId, navigate, isDataUpdated, newData]);

  const updateCourseData = async () => {
    setIsdataUpdated((prevData) => (prevData + 1) % 2);
  };
  const updateCourseData2 = async () => {
    setNewdata((prevData) => (prevData + 1) % 2);
  };

  return (
    <div className="w-full grid 800px:grid-cols-10 mb-12 mt-4">
      <div className="col-span-7">
        <CourseMedia
          data={data}
          courseId={courseId}
          activeVideo={activeVideo}
          setActiveVideo={setActiveVideo}
          tutor={tutor}
          updateCourseData={updateCourseData}
          updateCourseData2={updateCourseData2}
          socket={socket}
        />
      </div>
      <div className="800px:block 800px:col-span-3">
        <CourseContentList
          setActiveVideo={setActiveVideo}
          data={data}
          activeVideo={activeVideo}
        />
      </div>
    </div>
  );
};

export default InstCourseAccess;
