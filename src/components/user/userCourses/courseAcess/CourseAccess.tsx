import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../../app/store";
import { getCourseContent } from "../../../services/Api/userApi";
import CourseContentMedia from "./CourseContentMedia";
import CourseContentList from "../CourseContentList";
import Cookies from "js-cookie";

const CourseAccess = () => {
  const [course, setCourse] = useState<object>();
  const [data, setData] = useState<object[]>([{}]);
  const [activeVideo, setActiveVideo] = useState(0);

  const params = useParams();
  const courseId = params._id || "";
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.login.user);

  useEffect(() => {
    const fetchCourseContent = async () => {
      const CookieToken = Cookies.get("access_token");
      try {
        if (user) {
          const courseExists = user?.courses.find((id: any) => id === courseId);
          if (!courseExists && !CookieToken) {
            navigate("/");
            return;
          }
        } else {
          navigate("/");
          return;
        }

        const res = await getCourseContent(courseId);
        if (res) {
          setCourse(res?.data.result.course);
          setData(res?.data.result.course.courseData);
          // console.log(res?.data.result.course.courseData);
        }
        // console.log(res?.data.result.course);
      } catch (error) {
        console.error("Error fetching course content:", error);
      }
    };

    fetchCourseContent();
  }, [user, courseId, navigate]);

  const updateCourseData = async () => {
    console.log("update course data called");

    try {
      if (user) {
        console.log("nouser1");
        const courseExists = user?.courses.find((id: any) => id === courseId);
        if (!courseExists || !CookieToken) {
          navigate("/");
          return;
        }
      } else {
        console.log("nouser1");
        navigate("/");
        return;
      }

      const res = await getCourseContent(courseId);
      if (res) {
        setCourse(res?.data.result.course);
        setData(res?.data.result.course.courseData);
        // console.log(res?.data.result.course.courseData);
      }
      console.log(res?.data.result.course);
    } catch (error) {
      console.error("Error fetching course content:", error);
    }
  };

  return (
    <div className="w-full grid 800px:grid-cols-10 mb-12 mt-4">
      <div className="col-span-7">
        <CourseContentMedia
          data={data}
          courseId={courseId}
          activeVideo={activeVideo}
          setActiveVideo={setActiveVideo}
          user={user}
          updateCourseData={updateCourseData}
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

export default CourseAccess;
