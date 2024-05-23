import React, { useEffect, useState } from "react";
import CourseTile from "./courseTIle";
import { useLocation } from "react-router-dom";



const InstCourses: React.FC = () => {
    const location = useLocation();
    const {state} = location;
    const courses = state.courses || []

  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 12;




  // Pagination logic
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  // console.log(currentCourses);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="mx-20 my-12 w-80vw">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {currentCourses.map((course: any, index: number) => (
          <div key={index}>
            <CourseTile course={course} index={index} />
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="mt-20 flex justify-center">
        {Array(Math.ceil(courses.length / coursesPerPage))
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

export default InstCourses;
