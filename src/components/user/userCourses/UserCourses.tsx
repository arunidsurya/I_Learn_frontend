import axios from "axios";
import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";

const UserCourses: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 12; // Adjust as needed

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/user/courses",
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        setCourses(response.data.result.courses);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // console.log(courses);
  

  const filteredCourses = courses.filter(
    (course: any) =>
      course.courseTitle &&
      course.courseTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  // console.log(currentCourses);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="mx-20 my-12 w-80vw">
      {error && <>{error}</>}
      <input
        type="text"
        placeholder="Search Courses"
        className="mb-10 rounded-md w-[20%] p-1 border border-gray-200"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {currentCourses.map((course: any, index: number) => (
          <div key={index}>
            <CourseCard course={course} index={index} />
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="mt-20 flex justify-center">
        {Array(Math.ceil(filteredCourses.length / coursesPerPage))
          .fill(null)
          .map((_, index) => (
            <button
              key={index}
              className={`mx-1 px-3 py-1 border ${
                currentPage === index + 1 ? "bg-gray-300" : "bg-gray-100"
              }`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          ))}
      </div>
    </div>
  );
};

export default UserCourses;
