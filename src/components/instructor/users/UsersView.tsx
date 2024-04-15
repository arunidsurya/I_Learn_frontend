import axios from "axios";
import React, { useEffect, useState } from "react";

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

  useEffect(() => {
    axios
      .post("http://localhost:5000/api/v1/admin/getUsers", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          setUsersData(response.data.users); // Assuming the users array is nested under a key named 'users'
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <div className="flex justify-between items-center mb-3">
        <strong className="text-gray-700 font-medium">Users</strong>
        <button className="bg-blue-500 text-white px-3 py-1 rounded-md">
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
                <button className="w-20 h-8 rounded-md bg-red-500 text-white mr-2">
                  Block
                </button>
                <button className="w-20 h-8 rounded-md bg-blue-500 text-white">
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersView;
