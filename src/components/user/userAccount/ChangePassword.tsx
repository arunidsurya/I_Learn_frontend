
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { changePassword } from "../../services/api/userApi";

const ChangePassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [oldPassword, setoldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [unsuccessMessage, setUnSuccessMessage] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const storedUserData = localStorage.getItem("user");
    // console.log("user", storedUserData);
    if (storedUserData) {
      const parseData = JSON.parse(storedUserData);
      const currentUser = parseData.user;
      // console.log(currentUser);

      setEmail(currentUser.email);
      setSuccessMessage("");
      setErrorPassword("");
      // console.log(currentUser.name, currentUser.email);
    }
  }, []);

  

  const validationSchema = Yup.object({
    oldPassword: Yup.string().required("Field is required"),
    newPassword: Yup.string()
      .required("Field is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: Yup.string()
      .required("Field is required")
      .oneOf([Yup.ref("newPassword")], "Passwords must match"),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await validationSchema.validate(
        { oldPassword, newPassword, confirmPassword },
        { abortEarly: false }
      );
      const res = await changePassword(email, oldPassword, newPassword);
      if (res?.data.success) {
        setErrorPassword("");
        setUnSuccessMessage("");
        setSuccessMessage(res.data.user.message);
      } else {
        setSuccessMessage("");
        setErrorPassword("");
        setUnSuccessMessage(res?.data.message);
      }
    } catch (error: any) {
      const newError: { [key: string]: string } = {};

      console.log(error.inner);

      error.inner.forEach((err: any) => {
        newError[err.path] = err.message;
      });
      setErrors(newError);
    }
  };

  return (
    <div>
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 items-center mt-8"
        >
          {successMessage && (
            <div className="h-10 w-2/4 bg-green-500 text-white flex justify-center items-center ">
              <p>{successMessage}</p>
            </div>
          )}
          {unsuccessMessage && (
            <div className="h-10 w-2/4 bg-red-500 text-white flex justify-center items-center ">
              <p>{unsuccessMessage}</p>
            </div>
          )}
          <label
            htmlFor="currentPassword"
            className="text-lg font-bold text-left mt-10"
          >
            Current Password
          </label>
          {errors.oldPassword && (
            <div>
              <p className="text-red-500">*{errors.oldPassword}</p>
            </div>
          )}
          <input
            type="password"
            name="oldPassword"
            value={oldPassword}
            onChange={(e) => setoldPassword(e.target.value)}
            className="rounded-md border border-gray-400 w-2/6 h-10 items-start"
          />

          <label htmlFor="newPassword" className="text-lg font-bold">
            New Password
          </label>
          {errors.newPassword && (
            <div>
              <p className="text-red-500">*{errors.newPassword}</p>
            </div>
          )}
          <input
            type="password"
            name="newPassword"
            value={newPassword}
            className="rounded-md border border-gray-400 w-2/6 h-10"
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <label htmlFor="confirmPassword" className="text-lg font-bold">
            Repeat Password
          </label>
          {errors.confirmPassword && (
            <div>
              <p className="text-red-500">*{errors.confirmPassword}</p>
            </div>
          )}
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            className="rounded-md border border-gray-400 w-2/6 h-10"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button className="bg-blue-800 rounded-md text-white border border-gray-400 w-2/6 h-10 mt-4">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
