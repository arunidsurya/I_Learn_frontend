
import React, { useEffect, useState } from "react";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import {
  handleChangeTutorStatus,
  handlegetTutors,
} from "../../services/api/adminApi";
import { IoCloseOutline } from "react-icons/io5";

interface MemberData {
  _id: string;
  name: string;
  email: string;
  gender: string;
  institute: string;
  qualifiaction: string;
  experience: string;
  password: string;
  avtar?: string;
  isVerified?: boolean;
  isBolcked?: boolean;
}

const MembersView: React.FC = () => {
  const [membersData, setMembersData] = useState<MemberData[]>([]);
  const [page, setPage] = useState(1);
  const [success, setSuccess] = useState(0);
  const [forceRender, setForceRender] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [open, setOpen] = useState(false)

  const rowsPerPage = 8;

  const pages = Math.ceil(membersData.length / rowsPerPage);

  // const items = React.useMemo(() => {
  //   const start = (page - 1) * rowsPerPage;
  //   const end = start + rowsPerPage;

  //   return membersData.slice(start, end);
  // }, [page, membersData]);

  const paginate = (pageNumber: number) => setPage(pageNumber);

  const navigate = useNavigate();

  const getTutors = async () => {
    try {
      const response = await handlegetTutors();
      if (response?.data.success) {
        console.log(response.data);
        setMembersData(response.data.tutors);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("useEffect called");
    getTutors();
  }, [forceRender,success]);

  const handleVerification = async (method: string, _id: string) => {
    try {
      const response = await handleChangeTutorStatus(method, _id);

      if (response?.data.success) {
        setSuccess((prevSuccess) => (prevSuccess === 0 ? 1 : 0));
         setForceRender((prev) => !prev);
      }
    } catch (error) {
      console.log(error);
    }

  };
    const handleConfirmAction = () => {
      if (selectedUserId && selectedMethod) {
        handleVerification(selectedMethod, selectedUserId);
      }
      setOpen(false);
      setSelectedMethod("");
      setSelectedUserId("");
    };
  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <div className="flex justify-between items-center mb-3">
        <strong className="text-gray-700 font-medium">Users</strong>
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded-md"
          onClick={() => navigate("/admin/addUser")}
        >
          Add Member
        </button>
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
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Courses
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              institute
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Qulai.
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Exper.
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
          {membersData.map((user, index) => (
            <tr key={user._id}>
              <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">0</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.institute}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {user.qualifiaction}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {user.experience} Years
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.isVerified
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {user.isVerified ? "Active" : "Not verified"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {!user.isVerified ? (
                  <button
                    className="w-32 h-8 rounded-md bg-green-500 text-white mr-2"
                    // onClick={() => handleVerification("verifyTutor", user._id)}
                    onClick={() => {
                      setSelectedUserId(user._id),
                        setSelectedMethod("verifyTutor");
                        setOpen(true)
                    }}
                  >
                    Verify {user.isVerified}
                  </button>
                ) : (
                  <button
                    className="w-32 h-8 rounded-md bg-red-500 text-white mr-2"
                    // onClick={() => handleVerification("refuteTutor", user._id)}
                    onClick={() => {
                      setSelectedUserId(user._id),
                        setSelectedMethod("refuteTutor"),
                        setOpen(true);
                    }}
                  >
                    refute{user.isVerified}
                  </button>
                )}

                <button
                  className="w-20 h-8 rounded-md bg-blue-500 text-white"
                  onClick={() =>
                    navigate("/admin/edit_member", { state: user })
                  }
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal*/}
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
                    setSelectedUserId("");
                    setSelectedMethod("");
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

export default MembersView;
