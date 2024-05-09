import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

interface UserData {
  _id: string;
  name: string;
  email: string;
  gender: string;
  isVerified: boolean;
  isBlocked: boolean;
  courses: any[]; // Update this to the correct type of courses if available
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const UsersView: React.FC = () => {
  const [usersData, setUsersData] = useState<UserData[]>([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [open, setOpen] = useState(false);
  const [mesage, setMesage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setMesage("");
    axios
      .get("http://localhost:5000/api/v1/admin/getUsers", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          setUsersData(response.data.users);
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [mesage]);

  const handleBlock = (method: string, _id: string) => {
    axios
      .post(
        `http://localhost:5000/api/v1/admin/${method}`,
        { _id },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          setMesage("User status changed");
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  const handleConfirmAction = () => {
    if (selectedUserId && selectedMethod) {
      handleBlock(selectedMethod, selectedUserId);
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
          Add User
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
              Purchased Courses
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
              Gender
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
          {usersData.map((user, index) => (
            <tr key={user._id}>
              <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {user.courses.length}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.gender}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.isBlocked
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {user.isBlocked ? "Blocked" : "Active"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {user.isBlocked ? (
                  <button
                    className="w-20 h-8 rounded-md bg-green-500 text-white mr-2"
                    onClick={() => {
                      setSelectedMethod("unBlockUser");
                      setSelectedUserId(user._id);
                      setOpen(true);
                    }}
                  >
                    unBlock
                  </button>
                ) : (
                  <button
                    className="w-20 h-8 rounded-md bg-red-500 text-white mr-2"
                    onClick={() => {
                      setSelectedMethod("blockUser");
                      setSelectedUserId(user._id);
                      setOpen(true);
                    }}
                  >
                    Block
                  </button>
                )}

                <button
                  className="w-20 h-8 rounded-md bg-blue-500 text-white"
                  onClick={() => navigate("/admin/editUser", { state: user })}
                >
                  Edit
                </button>
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
                    setSelectedMethod("");
                    setSelectedUserId("");
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
    </div>
  );
};

export default UsersView;
