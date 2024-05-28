import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DeleteFileFromS3Bucket } from "../../utils/DeletefromS3Bucket";

type Props = {
  courseData: any;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  itemsToRemove: any[];
  newUrls: any[];
};

const EditCourseSubmitResult: React.FC<Props> = ({
  courseData,
  isLoading,
  setIsLoading,
  itemsToRemove,
  newUrls,
}) => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  //   useEffect(() => {
  //     if (Object.keys(courseData).length !== 0) {
  //       console.log("calling axios");

  //       // Once courseData is available and not empty, make the Axios POST request
  //       axios
  //         .post(
  //           "http://localhost:5000/api/v1/tutor/create_course",
  //           { data: courseData },
  //           { withCredentials: true }
  //         )
  //         .then((res) => {
  //           console.log(res.data);

  //           if (res.data.success) {
  //             setError("");
  //             setMessage("course added Successfully");
  //             // Navigate or perform any other action upon success
  //           }
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //           setError("Internal server error, please try again later!!!");
  //         })
  //         .finally(() => {
  //           setIsLoading(false); // Make sure to handle loading state accordingly
  //         });
  //     }
  //   }, []);.

  const handleSubmit = async () => {
    if (!isLoading) {
      try {
        // Delete items from S3 bucket
        await Promise.all(
          itemsToRemove.map(async (item: string) => {
            await DeleteFileFromS3Bucket(item);
          })
        );

        // Send Axios request
        const response = await axios.put(
          "http://localhost:5000/api/v1/tutor/edit_course",
          { data: courseData },
          { withCredentials: true }
        );

        console.log(response.data);

        if (response.data.success) {
          setError("");
          setMessage("Course added successfully");
          // Navigate or perform any other action upon success
        }
      } catch (error) {
        console.error(error);
        setError("Internal server error, please try again later!!!");
      } finally {
        setIsLoading(false); // Make sure to handle loading state accordingly
      }
    }
  };

  console.log("calling component");

  const handleReload = async () => {
    await Promise.all(
      newUrls.map(async (item: string) => {
        await DeleteFileFromS3Bucket(item);
      })
    );
    window.location.reload();
  };

  return (
    <div>
      {!message && !error && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            &#8203;
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    {/* Icon or Image Here */}
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Upload Course?
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure want to create this course? If yes!! please
                        confirm below
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleSubmit}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Confirm
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleReload}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {message && (
        <div className="w-full border border-gray-500 rounded-sm h-20 flex items-center justify-center bg-blue-200 mt-10">
          {message}!! click here to {/* Use onClick to trigger page reload */}
          <span onClick={handleReload}>
            <Link
              to={"/instructor/create_course"}
              className="text-green-500 font-bold"
            >
              add new course{" "}
            </Link>{" "}
          </span>
          or click to
          <Link
            className="text-green-500 font-bold"
            to={"/instructor/live_courses"}
          >
            view live courses
          </Link>
        </div>
      )}
      {error && (
        <div className="w-full border border-gray-500 rounded-sm h-20 flex items-center justify-center bg-blue-200 mt-10 text-red-500">
          {error} click here to add new course{" "}
        </div>
      )}
    </div>
  );
};

export default React.memo(EditCourseSubmitResult);
