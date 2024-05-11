import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

type category = {
  _id: string;
  name: string;
  description: string;
};

const CategoriesView: React.FC = () => {
  const [categories, setCategories] = useState<category[]>([]);
  const [page, setPage] = useState(1);

  const rowsPerPage = 8;

  const pages = Math.ceil(categories.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return categories.slice(start, end);
  }, [page, categories]);

  const paginate = (pageNumber: number) => setPage(pageNumber);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/admin/get_categories", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          setCategories(response.data.categories); // Assuming the users array is nested under a key named 'users'
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleDelete = (_id: string) => {
    axios
      .delete(`http://localhost:5000/api/v1/admin/delete_category/${_id}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <div className="flex justify-between items-center mb-3">
        <strong className="text-gray-700 font-medium">Categories</strong>
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded-md"
          onClick={() => navigate("/admin/add_category")}
        >
          Add Category
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
              Category Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Description
            </th>

            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 ">
          {items.map((category, index) => (
            <tr key={category._id}>
              <td className="px-6 py-4 whitespace-nowrap">{(page - 1) * rowsPerPage + index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">{category.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {category.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  className="w-20 h-8 rounded-md bg-blue-500 text-white mr-2"
                  onClick={() =>
                    navigate("/admin/edit_category", { state: category })
                  }
                >
                  Edit
                </button>
                <button
                  className="w-20 h-8 rounded-md bg-red-500 text-white"
                  onClick={() => handleDelete(category._id)}
                >
                  Delete
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

export default CategoriesView;
