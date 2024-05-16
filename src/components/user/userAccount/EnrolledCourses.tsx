import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {RootState} from '../../../redux/store'
import { enrolledCourses } from "../../services/api/userApi";
import CourseCard from "../userCourses/CourseCard";

const EnrolledCourses: React.FC = () => {
  const [courses, setcourses] = useState<any[]>([])

  const user = useSelector((state:RootState)=>state.login.user);

  const getEnrolledCourses=async()=>{
      try {
        const userId = user?._id || "";
        console.log(userId);
        
        const res = await enrolledCourses(userId);
        if(res?.data.success){
          setcourses(res.data.result)
        }
        
      } catch (error) {
        
      }
  }
  useEffect(()=>{
    getEnrolledCourses()
  },[])
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-10 mr-8">
      {courses.map((course: any, index: number) => (
        <div key={index}>
          <CourseCard course={course} index={index} />
        </div>
      ))}
    </div>
  );
};

export default EnrolledCourses;
