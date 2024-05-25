import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import {
  handleGetCourses,
  handleGetSearchResults,
} from "../../services/api/userApi";
import debounce from "lodash.debounce";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";

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

const UserCourses: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const coursesPerPage = 12;

  const fetchCourses = async () => {
    try {
      const response = await handleGetCourses();
      if (response?.data.success) {
        setFilteredCourses(response.data.result.courses);
      } else {
        setError(response?.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  let currentCourses;
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;

  filteredCourses.length > 0
    ? (currentCourses = filteredCourses.slice(
        indexOfFirstCourse,
        indexOfLastCourse
      ))
    : (currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse));

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


  const totalCourses = filteredCourses.length > 0 ? filteredCourses.length : courses.length;
  const totalPages = Math.ceil(totalCourses / coursesPerPage);
  const pageNumbers = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else if (currentPage <= 3) {
    pageNumbers.push(1, 2, 3, 4, 5, "...", totalPages);
  } else if (currentPage >= totalPages - 2) {
    pageNumbers.push(
      1,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages
    );
  } else {
    pageNumbers.push(
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages
    );
  }

  const getCourseBySearch = async (searchKey: string) => {
    await new Promise((resolve: any) => setTimeout(resolve, 1000));
    const response = await handleGetSearchResults(searchKey);
    if (response?.data.success) {
      setFilteredCourses(response.data.result);
    }
  };

  const debounceRequest = debounce(
    (searchQuery: string) => getCourseBySearch(searchQuery),
    500
  );

  return (
    <div className="mx-20 my-12 w-80vw">
      {error && <>{error}</>}
      <input
        type="text"
        placeholder="Search Courses"
        className="mb-10 rounded-md w-[20%] p-1 border border-gray-200"
        onChange={(e) => debounceRequest(e.target.value)}
      />

      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {currentCourses.map((course: any, index: number) => (
            <div key={index}>
              <CourseCard course={course} index={index} />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {currentCourses.map((course: any, index: number) => (
            <div key={index}>
              <CourseCard course={course} index={index} />
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="mt-20 flex justify-center items-center">
        <button
          className="mx-1 px-3 py-1 border bg-gray-100"
          onClick={() => currentPage > 1 && paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <MdSkipPrevious />
        </button>
        {pageNumbers.map((pageNumber, index) => (
          <button
            key={index}
            className={`mx-1 px-3 py-1 border ${
              currentPage === pageNumber ? "bg-gray-300" : "bg-gray-100"
            }`}
            onClick={() =>
              typeof pageNumber === "number" && paginate(pageNumber)
            }
            disabled={pageNumber === "..."}
          >
            {pageNumber}
          </button>
        ))}
        <button
          className="mx-1 px-3 py-1 border bg-gray-100"
          onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <MdSkipNext />
        </button>
      </div>
    </div>
  );
};

export default UserCourses;

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import CourseCard from "./CourseCard";
// import { handleGetCourses } from "../../services/api/userApi";

// const UserCourses: React.FC = () => {
//   const [courses, setCourses] = useState<any[]>([]);
//   const [error, setError] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const coursesPerPage = 12;

//   const fetchCourses = async () => {
//     try {
//       const response = await handleGetCourses();
//       if (response?.data.success) {
//         setCourses(response.data.result.courses);
//       } else {
//         setError(response?.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   // console.log(courses);

//   const filteredCourses = courses.filter(
//     (course: any) =>
//       course.courseTitle &&
//       course.courseTitle.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Pagination logic
//   const indexOfLastCourse = currentPage * coursesPerPage;
//   const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
//   const currentCourses = filteredCourses.slice(
//     indexOfFirstCourse,
//     indexOfLastCourse
//   );

//   // console.log(currentCourses);

//   // Change page
//   const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

//   return (
//     <div className="mx-20 my-12 w-80vw">
//       {error && <>{error}</>}
//       <input
//         type="text"
//         placeholder="Search Courses"
//         className="mb-10 rounded-md w-[20%] p-1 border border-gray-200"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//       />
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
//         {currentCourses.map((course: any, index: number) => (
//           <div key={index}>
//             <CourseCard course={course} index={index} />
//           </div>
//         ))}
//       </div>
//       {/* Pagination */}
//       <div className="mt-20 flex justify-center">
//         {Array(Math.ceil(filteredCourses.length / coursesPerPage))
//           .fill(null)
//           .map((_, index) => (
//             <button
//               key={index}
//               className={`mx-1 px-3 py-1 border ${
//                 currentPage === index + 1 ? "bg-gray-300" : "bg-gray-100"
//               }`}
//               onClick={() => paginate(index + 1)}
//             >
//               {index + 1}
//             </button>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default UserCourses;
