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
      .get("http://localhost:5000/api/v1/get_users", {
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
      <strong className="text-gray-700 font-medium">Users</strong>
      <div className="mt-3">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Purchased Courses</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Status</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>10</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>
                  <button>Block</button>
                </td>
                <td>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersView;
