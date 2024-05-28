import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { handleGetStudents } from "../../services/api/tutorApi";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";

interface Course {
  _id: string;
  name: string;
}

interface Student {
  _id: string;
  name: string;
  email: string;
  courses: Course[];
}

const Students = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [page, setPage] = useState(1);


  const tutor = useSelector((state: any) => state.login.tutor);
  // console.log(tutor);

  const rowsPerPage = 4;

  const pages = Math.ceil(students.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return students.slice(start, end);
  }, [page, students]);

  const paginate = (pageNumber: number) => setPage(pageNumber);

  const getStudents = async () => {
    const res = await handleGetStudents(tutor._id);
    console.log(res?.data);
    setStudents(res?.data.result);
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <div>
      {" "}
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
              Student Name
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
              enrolled courses
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items.map((student, index) => (
            <tr key={student?._id}>
              <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{student.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {student.courses.map((course) => (
                  <li key={course._id}>{course.name.slice(0, 80)}</li>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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

export default Students;
