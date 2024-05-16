import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteFileFromS3Bucket } from "../utils/DeletefromS3Bucket";
import CourseModal from "./CourseModal";
import { MdDelete, MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";

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

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);

  const navigate = useNavigate();

  const tutor = useSelector((state: any) => state.login.tutor);
  // console.log(tutor);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/tutor/courses/${tutor._id}`, {
        withCredentials: true,
      })
      .then((response) => {
        // console.log(response.data.courses.courses);
        if (response.data.success) {
          setCourses(response.data.courses.courses);
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleDelete = async (course: Course) => {
    try {
      await Promise.all(
        course.courseData.map(async (data: any) => {
          try {
            await DeleteFileFromS3Bucket(data.videoUrl);
          } catch (error) {
            console.error("Error deleting file from S3 bucket:", error);
            setError("Course deletion unsuccessful");
            throw new Error("Error deleting file from S3 bucket");
          }
        })
      );

      await DeleteFileFromS3Bucket(course.thumbnail);
      await DeleteFileFromS3Bucket(course.demoUrl);

      const response = await axios.delete(
        `http://localhost:5000/api/v1/tutor/delete_course/${course._id}`,
        {
          withCredentials: true,
        }
      );
      console.log(response);

      if (response.data.success) {
        setMessage("Course deleted Successfully!!");
      } else {
        setError("Course deletion unsuccessful");

        throw new Error("Server returned unsuccessful response");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

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

  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <div className="flex justify-between items-center mb-3">
        <strong className="text-gray-700 font-bold text-2xl">
          Live Courses
        </strong>
      </div>
      {error && (
        <div className="text-red-500 w-full bg-blue-100 mb-4 font-bold p-4 rounded-md">
          {error}
        </div>
      )}
      {message && (
        <div className="text-green-500 w-full bg-blue-100 mb-4 font-bold p-4 rounded-md">
          {message}
        </div>
      )}
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
              Live CLass
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
          {courses.map((course, index) => (
            <tr key={course?._id}>
              <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
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
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {course.approved ? "approved" : "Not approved"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="bg-blue-500 text-white rounded-md min-w-[80px] min-h-[30px]"
                onClick={()=>navigate("/instructor/schedule_class",{state:course._id})}
                >
                  Schedule
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex gap-4">
                  <div
                    onClick={() =>
                      navigate("/instructor/edit_Course", { state: course })
                    }
                  >
                    <MdEdit size={25} className="text-green-500" />
                  </div>

                  <div
                    onClick={() => {
                      setCourseToDelete(course);
                      setShowModal(true);
                    }}
                  >
                    <MdDelete size={25} className="text-red-500" />
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <CourseModal
          showModal={showModal}
          setShowModal={setShowModal}
          courseToDelete={courseToDelete}
          setCourseToDelete={setCourseToDelete}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default React.memo(Courses);

