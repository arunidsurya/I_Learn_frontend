import axios from "axios";
import React, { useEffect, useState } from "react";

const ChangePassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [oldPassword, setoldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [unsuccessMessage, setUnSuccessMessage] = useState<string>("");

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(oldPassword, newPassword, confirmPassword, email);
    setErrorPassword("");
    if (newPassword !== confirmPassword) {
      setErrorPassword("Passwords are not matching");
      return;
    }
    axios
      .put(
        "http://localhost:5000/api/v1/user/update_user_password",
        { email, oldPassword, newPassword },
        {
          withCredentials: true,
        }
      )
      .then((res: any) => {
        // console.log(res.data.message);
        if (res.data.success) {
          setErrorPassword("");
          setUnSuccessMessage("");
          setSuccessMessage(res.data.user.message);
        } else {
          setSuccessMessage("");
          setErrorPassword("");
          setUnSuccessMessage(res.data.message);
        }
      })
      .catch((error: any) => {
        console.error(error);
      });
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
            htmlFor="password"
            className="text-lg font-bold text-left mt-10 "
          >
            Current Password
          </label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setoldPassword(e.target.value)}
            className="rounded-md border border-gray-400 w-2/6 h-10 items-start"
          />
          <label htmlFor="password" className="text-lg font-bold">
            New Password
          </label>
          <input
            type="password"
            value={newPassword}
            className="rounded-md border border-gray-400 w-2/6 h-10"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {errorPassword && (
            <div>
              <p className="text-red-500 items-start">
                passwords are not matching
              </p>
            </div>
          )}
          <label htmlFor="password" className="text-lg font-bold">
            Repeat Password
          </label>
          <input
            type="password"
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
