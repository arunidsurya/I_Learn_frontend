
import React, { useEffect, useState } from "react";
import { Link, useLocation} from "react-router-dom";
import { TERipple } from "tw-elements-react";
import * as Yup from "yup";
import { editCategory } from "../../services/api/adminApi";

const EditCategory: React.FC = () => {
  const [_id, set_Id] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});



  const location = useLocation();

  // Retrieve user data from location state
  const categoryData = location.state;

  // Set initial state of input fields with user data
  useEffect(() => {
    if (categoryData) {
      setName(categoryData.name || "");
      setDescription(categoryData.description || "");
      set_Id(categoryData._id || "");
      setError("");
      setMessage("");
    }
  }, [categoryData]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
  });

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    try {
      await validationSchema.validate(
        { name, description },
        { abortEarly: false }
      );

      const res = await editCategory(_id, name, description);

      if (res?.data.success) {
        setError("");
        setMessage(res.data.message);
      } else {
        setError(res?.data.message);
      }
    } catch (error: any) {
      const newError: { [key: string]: string } = {};

      error.inner.forEach((err: any) => {
        newError[err.path] = err.message;
      });
      setErrors(newError);
    }
  };

  return (
    <section className="h-full  flex justify-center items-center">
      <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
        <h1 className="text-2xl font-bold mb-10 text-center">Add CATEGORY</h1>
        <form onSubmit={handleUpdate}>
          {error && (
            <div className="w-full bg-blue-100 border border-gray-500 mb-4 flex items-center justify-center rounded-md">
              <p className="text-red-500 font-bold text-lg">{error}</p>
            </div>
          )}

          {message && (
            <div className="w-full bg-blue-100 border border-gray-500 mb-4 flex items-center justify-center rounded-md">
              <p className="font-bold text-lg mb-3">
                {message} click here to{" "}
                <Link to={"/admin/categories"} className="text-green-500">
                  view categories
                </Link>
              </p>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name</label>
            {errors.name && <p className="text-red-500">*{errors.name}</p>}
            <input
              type="text"
              placeholder="Enter Your Name..."
              className="w-full border border-gray-300 rounded h-10"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="email" className="mt-4">
              Description
            </label>
            {errors.description && (
              <p className="text-red-500">*{errors.description}</p>
            )}
            <textarea
              rows={8}
              cols={20}
              placeholder="Enter Description..."
              className="w-full border border-gray-300 rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="text-center lg:text-left mt-10">
            <TERipple rippleColor="light">
              <button
                type="submit"
                className="inline-block rounded bg-blue-500 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                update
              </button>
            </TERipple>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditCategory;
