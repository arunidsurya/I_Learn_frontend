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
  console.log(tutor);

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

// import React from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import { Box, Button } from "@mui/material";
// import { AiOutlineDelete } from "react-icons/ai";
// import { MdModeEdit } from "react-icons/md";

// const Courses: React.FC = () => {
//   const columns = [
//     { field: "id", headerName: "ID", flex: 0.5 },
//     { field: "courseTitle", headerName: "Course Title", flex: 1 },
//     { field: "rating", headerName: "Rating", flex: 0.5 },
//     { field: "purchased", headerName: "Purchased", flex: 0.5 },
//     { field: "created_at", headerName: "Created AT", flex: 0.5 }, // Corrected field name
//     {
//       field: "  ",
//       headerName: "Edit",
//       flex: 0.2,
//       renderCell: (params: any) => {
//         return (
//           <>
//             <Button>
//               <MdModeEdit className="text-green-500" size={20} />
//             </Button>
//           </>
//         );
//       },
//     },
//     {
//       field: " ",
//       headerName: "Delete",
//       flex: 0.2,
//       renderCell: (params: any) => {
//         return (
//           <>
//             <Button>
//               <AiOutlineDelete className="text-red-500" size={20} />
//             </Button>
//           </>
//         );
//       },
//     },
//   ];

//   const rows = [
//     {
//       id: "1234",
//       courseTitle: "React",
//       purchased: "30",
//       rating: "5",
//       created_at: "12/12/12", // You need to provide the correct data here
//     },
//   ];

//   return (
//     <div className="mt-[50px]">
//       <Box m="20px">
//         <Box
//           m="40px 0 0 0"
//           height="80vh"
//           sx={{
//             "& .MuiDataGrid-root": {
//               backgroundColor: "#fff",
//             },
//             "& .css-pqjvzy-MuiSvgIcon-root-MUiSelect-icon": {
//               color: "#fff",
//             },
//             "& .MuiDataGrid-sortIcon": {
//               color: "#fff",
//             },
//             "& .MuiDataGrid-row": {
//               color: "#fff",
//               borderBottom: "1px solid #ccc!important",
//             },
//             "& .MuiTablePagination-root": {
//               color: "#fff",
//             },
//             "& .MuiDataGrid-cell": {
//               borderBottom: "none",
//             },
//             "& .name-column-cell": {
//               color: "#fff",
//             },
//             "& .MuiDataGrid-columnHeader": {
//               backgroundColor: "#595959",
//               borderBottom: "none",
//               color: "#fff",
//             },
//             "& .MuiDataGrid-columnsContainer, & .MuiDataGrid-cell": {
//               color: "#000",
//             },
//             "& .MuiDataGrid-virtualScroller": {
//               backgroundColor: "#fff",
//             },
//             "& .MuiDataGrid-footerContainer": {
//               backgroundColor: "#595959",
//               borderTop: "none",
//               color: "#fff",
//             },
//             "& .MuiCheckbox-root": {
//               color: "#000!important",
//             },
//             "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
//               color: "#fff !important",
//             },
//           }}
//         >
//           <DataGrid checkboxSelection rows={rows} columns={columns} />
//         </Box>
//       </Box>
//     </div>
//   );
// };

// export default Courses;
