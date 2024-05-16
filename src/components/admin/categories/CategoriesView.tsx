import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { deleteCategory, viewCategory } from "../../services/api/adminApi";
import { IoCloseOutline } from "react-icons/io5";
import toast from "react-hot-toast";

type category = {
  _id: string;
  name: string;
  description: string;
};

const CategoriesView: React.FC = () => {
  const [categories, setCategories] = useState<category[]>([]);
  const [page, setPage] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setmessage] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedCategoryrId, setSelectedCategoryId] = useState("");

  const rowsPerPage = 8;

  const pages = Math.ceil(categories.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return categories.slice(start, end);
  }, [page, categories]);

  const paginate = (pageNumber: number) => setPage(pageNumber);

  const navigate = useNavigate();

  const getCategory = async () => {
    try {
      const response = await viewCategory();
      if (response?.data.success) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory();
  }, [isSuccess]);

  const handleDelete = async () => {
    setmessage("");
    setError("");
    try {
      const res = await deleteCategory(selectedCategoryrId);
      if (res?.data.success) {
        setIsSuccess(true);
        setmessage("Category deleted Successfully");
        // toast.success("Category deleted succesfully")
        toast.success("Category deleted succesfully");
      }
    } catch (error: any) {
      console.log(error);
      setError("Deletion unsuccessful!! please try again later");
    }
  };

  const handleConfirmAction = async () => {
    if (selectedCategoryrId) {
      handleDelete();
    }
    setOpen(false);
    setSelectedCategoryId("");
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
      {message && <p className="text-green-500 mb-4">* {message}</p>}
      {error && <p>{error}</p>}
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
              <td className="px-6 py-4 whitespace-nowrap">
                {(page - 1) * rowsPerPage + index + 1}
              </td>
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
                  onClick={() => {
                    setSelectedCategoryId(category._id), setOpen(true);
                  }}
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
                    setSelectedCategoryId("");
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

export default CategoriesView;
