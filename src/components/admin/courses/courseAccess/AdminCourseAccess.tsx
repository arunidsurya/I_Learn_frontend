import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CourseContentList from "./CourseContentList";
import CourseMedia from "./courseMedia";
import { handleGetOneCourse } from "../../../services/api/adminApi";

const AdminCourseAccess:React.FC = () => {
  const [data, setData] = useState<object[]>([{}]);
  const [activeVideo, setActiveVideo] = useState(0);
  const [isDataUpdated, setIsdataUpdated] = useState(0);
  const [newData, setNewdata] = useState(0);

  const params = useParams();
  const courseId = params._id || "";

  
  const navigate = useNavigate();

  const admin = useSelector((state:any)=>state.login.admin)



  useEffect(() => {
    const fetchCourseContent = async () => {
      try {

        const res = await handleGetOneCourse(courseId);
        if (res) {
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
          admin={admin}
          updateCourseData={updateCourseData}
          updateCourseData2={updateCourseData2}
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

export default AdminCourseAccess;
