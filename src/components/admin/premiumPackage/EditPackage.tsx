import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TERipple } from "tw-elements-react";
import * as Yup from "yup";
import { editCategory, handleEditPremiumPackage } from "../../services/api/adminApi";

const EditPackage: React.FC = () => {
  const [_id, set_Id] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<number>();
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const Navigate = useNavigate();

  const location = useLocation();

  // Retrieve user data from location state
  const packageData = location.state;

  // Set initial state of input fields with user data
  useEffect(() => {
    if (packageData) {
      setTitle(packageData.title || "");
      setDescription(packageData.description || "");
      setPrice(packageData.price || 0)
      set_Id(packageData._id || "");
      setError("");
      setMessage("");
    }
  }, [packageData]);

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number().required("Price is required"),
  });

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    try {
      await validationSchema.validate(
        { title, description ,price},
        { abortEarly: false }
      );

      const res = await handleEditPremiumPackage(_id, title, description,price || 0);

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
        <h1 className="text-2xl font-bold mb-10 text-center">EDIT PACKAGE</h1>
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
                <Link to={"/admin/premium/"} className="text-green-500">
                  VIEW PACKAGES
                </Link>
              </p>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label htmlFor="name">Title</label>
            {errors.title && <p className="text-red-500">*{errors.title}</p>}
            <input
              type="text"
              placeholder="Enter Your Name..."
              className="w-full border border-gray-300 rounded h-10"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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

          <label htmlFor="price">Price</label>
          {errors.price && <p className="text-red-500">*{errors.price}</p>}
          <input
            type="number"
            name="price"
            placeholder="Enter price..."
            className="w-full border border-gray-300 rounded h-10 px-2"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
          />

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

export default EditPackage;
