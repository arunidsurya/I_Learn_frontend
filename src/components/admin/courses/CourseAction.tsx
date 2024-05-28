import React, { useEffect, useState } from "react";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { IoCloseOutline } from "react-icons/io5";
import {
  getNonApprovedCourses,
  handleChangeCourseStatus,
} from "../../services/api/adminApi";
import { useNavigate } from "react-router-dom";

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
  approved?: boolean;
  ratings?: number;
  purchased?: number;
  createdAt: string;
}

const CourseAction: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const rowsPerPage = 8;

  const pages = Math.ceil(courses.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return courses.slice(start, end);
  }, [page, courses]);

  const paginate = (pageNumber: number) => setPage(pageNumber);

  const getCourses = async () => {
    try {
      const response = await getNonApprovedCourses();
      if (response?.data.success) {
        setCourses(response.data.courses);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourses();
  }, [message, error]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${day}-${months[monthIndex]}-${year}`;
  };

  const handleClick = async (status: string, courseId: any) => {
    setError("");
    setMessage("");

    try {
      const response = await handleChangeCourseStatus(status, courseId);
      if (response?.data.success) {
        setMessage(response.data.message);
      } else {
        setError(response?.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirmAction = () => {
    if (selectedCourseId && selectedAction) {
      handleClick(selectedAction, selectedCourseId);
    }
    setOpen(false);
    setSelectedCourseId(null);
    setSelectedAction(null);
  };

  const handleViewCourse = async (id: string) => {
    const courseId = id;

    navigate(`/admin/course_access/${courseId}`);
  };

  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <div className="flex justify-between items-center mb-3">
        <strong className="text-red-700 font-bold  text-2xl mb-4">
          Action Required
        </strong>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              s/n
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Course Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Ratings
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Purchased
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Created At
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items.map((course, index) => (
            <tr key={course?._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {(page - 1) * rowsPerPage + index + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {course.courseTitle.slice(0, 25)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">0</td>
              <td className="px-6 py-4 whitespace-nowrap">0</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {formatDate(course.createdAt)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    course.approved
                      ? "bg-green-100 text-green-800 min-w-22 flex items-center justify-center"
                      : "bg-red-100 text-red-800 min-w-22 flex items-center justify-center"
                  }`}
                >
                  {course.approved ? "Approved" : "Not approved"}
                </span>
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex gap-4">
                  {course.approved ? (
                    <button
                      className="bg-red-500 text-white rounded-md p-1 font-bold min-w-20"
                      onClick={() => {
                        setSelectedCourseId(course._id);
                        setSelectedAction("block");
                        setOpen(true);
                      }}
                    >
                      Block
                    </button>
                  ) : (
                    <div>
                      <button
                        className="bg-green-500 text-white rounded-md p-1 font-bold min-w-20 mr-4"
                        onClick={() => handleViewCourse(course._id)}
                      >
                        View Coures
                      </button>
                      <button
                        className="bg-green-500 text-white rounded-md p-1 font-bold min-w-20"
                        onClick={() => {
                          setSelectedCourseId(course._id);
                          setSelectedAction("approve");
                          setOpen(true);
                        }}
                      >
                        Approve
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {open && (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center">
          <div className="bg-black bg-opacity-50 absolute top-0 left-0 w-full h-full"></div>
          <div className="w-96 bg-white rounded-xl shadow-lg p-4 relative">
            <div className="absolute top-0 right-0">
              <IoCloseOutline
                size={24}
                className="text-black cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-xl font-bold mb-2">Are you sure?</h1>
              <p className="mb-4">Please confirm to proceed with the action.</p>
              <div className="flex space-x-4">
                <button
                  onClick={handleConfirmAction}
                  className="bg-green-500 text-white px-4 py-2 rounded-md shadow-sm transition duration-300 hover:bg-green-600"
                >
                  Confirm
                </button>
                <button
                  onClick={() => {
                    setSelectedAction("");
                    setSelectedCourseId("");
                    setOpen(false);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-md shadow-sm transition duration-300 hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* pagination */}
      <div className="mt-20 flex justify-center">
        <button
          onClick={() => paginate(page - 1)}
          disabled={page === 1}
          className="mx-1 px-3 py-1 border bg-gray-100"
        >
          <BiSkipPrevious size={20} />
        </button>
        {Array.from({ length: Math.min(5, pages) }, (_, index) => {
          const pageNumber = index + 1;
          const pageLimit = 5;
          const middleIndex = Math.floor(pageLimit / 2);
            pages <= pageLimit
              ? pages
              : page + middleIndex >= pages
              ? Math.min(pages, pageLimit)
              : page <= middleIndex
              ? pageLimit
              : page + middleIndex >= pages
              ? pages
              : page + middleIndex;
          const firstPage =
            page <= middleIndex
              ? 1
              : page + middleIndex >= pages
              ? pages - (pageLimit - 1)
              : page - middleIndex;
          return (
            <button
              key={index}
              className={`mx-1 px-3 py-1 border ${
                page === pageNumber ? "bg-gray-300" : "bg-gray-100"
              }`}
              onClick={() => paginate(firstPage + index)}
            >
              {firstPage + index}
            </button>
          );
        })}
        <button
          onClick={() => paginate(page + 1)}
          disabled={page === pages}
          className="mx-1 px-3 py-1 border bg-gray-100"
        >
          <BiSkipNext size={20} />
        </button>
      </div>
    </div>
  );
};

export default CourseAction;
