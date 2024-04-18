import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/admin/getTutors", {
        withCredentials: true,
      })
      .then((response) => {
        // console.log(response.data);
        if (response.data.success) {
          setMembersData(response.data.tutors); // Assuming the users array is nested under a key named 'users'
        }
      })
      .catch((error) => {
        console.error("Error fetching tutors:", error);
      });
  }, []);

  const handleVerification = (method: string, _id: string) => {
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
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
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
                    onClick={() => handleVerification("verifyTutor", user._id)}
                  >
                    Verify
                  </button>
                ) : (
                  <button
                    className="w-32 h-8 rounded-md bg-red-500 text-white mr-2"
                    onClick={() => handleVerification("refuteTutor", user._id)}
                  >
                    refute
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
    </div>
  );
};

export default MembersView;
