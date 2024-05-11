import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
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
    const [page, setPage] = useState(1);

    const rowsPerPage = 8;

    const pages = Math.ceil(membersData.length / rowsPerPage);

    const items = React.useMemo(() => {
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;

      return membersData.slice(start, end);
    }, [page, membersData]);

    const paginate = (pageNumber: number) => setPage(pageNumber);

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
          const displayPages =
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
